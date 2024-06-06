const recast = require('recast')
const recastBabelParser = require('recast/parsers/babel-ts')
const { visit } = require('ast-types')

const convertPxToRem = (value, basePx) =>
  value.replace(/(\d+)px/g, (_, number) => `${parseInt(number) / basePx}rem`)

const transformTailwindClasses = (code, options) => {
  const ast = recast.parse(code, {
    parser: recastBabelParser,
  })

  visit(ast, {
    visitJSXAttribute(path) {
      if (
        path.node.name.name === 'className' ||
        path.node.name.name === 'class'
      ) {
        if (path.node.value && path.node.value.type === 'StringLiteral') {
          path.node.value.value = path.node.value.value.replace(
            /(\w+-?\[[^\]]+])/g,
            (match) =>
              convertPxToRem(match, options.tailwindcssPxToRemBaseValue)
          )
        } else if (
          path.node.value &&
          path.node.value.type === 'JSXExpressionContainer' &&
          path.node.value.expression.type === 'StringLiteral'
        ) {
          path.node.value.expression.value =
            path.node.value.expression.value.replace(
              /(\w+-?\[[^\]]+])/g,
              (match) =>
                convertPxToRem(match, options.tailwindcssPxToRemBaseValue)
            )
        }
      }

      this.traverse(path)
    },
  })

  return recast.print(ast).code
}

module.exports = {
  transformTailwindClasses,
}
