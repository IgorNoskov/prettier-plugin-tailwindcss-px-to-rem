const prettier = require('prettier')
const plugin = require('../src/index.js')

const input = `<div className="p-[0.625rem] p-[5px] m-[10px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"></div>;`
const output = `<div className="p-[0.625rem] p-[0.3125rem] m-[0.625rem] shadow-[0_2.1875rem_3.75rem_-0.9375rem_rgba(0,0,0,0.3)]"></div>;`

test(`Test px to rem transform`, async () => {
  const formatted = await prettier.format(input, {
    parser: 'babel',
    plugins: [plugin],
  })

  expect(formatted.trim()).toBe(output)
})
