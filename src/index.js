const prettierBabelParser = require('prettier/parser-babel')
const { transformTailwindClasses } = require('./utils/misc')

const options = {
  tailwindcssPxToRemBaseValue: {
    type: 'int',
    category: 'Tailwindcss',
    default: 16,
    description: 'Base value to use for converting px to rem',
  },
}

const parsers = {
  babel: {
    ...prettierBabelParser.parsers.babel,
    preprocess: (code, options) => transformTailwindClasses(code, options),
  },
}

module.exports = {
  options,
  parsers,
}
