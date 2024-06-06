const recast = require('recast')
const recastBabelParser = require('recast/parsers/babel-ts')
const { visit } = require('ast-types')

const convertPxToRem = (value, basePx) =>
  value.replace(/(\d+)px/g, (_, number) => `${parseInt(number) / basePx}rem`)

const transformTailwindClasses = (code, options) => {
  const ast = recast.parse(code, {
    parser: recastBabelParser,
  })

  const processStringLiteral = (value) => {
    return value.replace(/(\w+-?\[[^\]]+])/g, (match) =>
      convertPxToRem(match, options.tailwindcssPxToRemBaseValue)
    )
  }

  const processNode = (node) => {
    if (node.type === 'StringLiteral') {
      node.value = processStringLiteral(node.value)
    } else if (node.type === 'JSXExpressionContainer') {
      if (node.expression.type === 'StringLiteral') {
        node.expression.value = processStringLiteral(node.expression.value)
      } else if (node.expression.type === 'ArrayExpression') {
        node.expression.elements.forEach((element) => {
          if (element.type === 'StringLiteral') {
            element.value = processStringLiteral(element.value)
          }
        })
      } else if (node.expression.type === 'CallExpression') {
        node.expression.arguments.forEach((arg) => {
          if (arg.type === 'StringLiteral') {
            arg.value = processStringLiteral(arg.value)
          } else if (arg.type === 'ArrayExpression') {
            arg.elements.forEach((element) => {
              if (element.type === 'StringLiteral') {
                element.value = processStringLiteral(element.value)
              }
            })
          }
        })
      }
    } else if (node.type === 'TemplateLiteral') {
      node.quasis.forEach((quasi) => {
        quasi.value.raw = processStringLiteral(quasi.value.raw)
        quasi.value.cooked = processStringLiteral(quasi.value.cooked)
      })
    }
  }

  visit(ast, {
    visitJSXAttribute(path) {
      if (
        path.node.name.name === 'className' ||
        path.node.name.name === 'class'
      ) {
        processNode(path.node.value)
      }
      this.traverse(path)
    },
  })

  return recast.print(ast).code
}

module.exports = {
  transformTailwindClasses,
}
