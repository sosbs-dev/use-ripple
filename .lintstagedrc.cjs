const { relative } = require('path')
const { ESLint } = require('eslint')

const removeIgnoredFiles = async (files) => {
  const cwd = process.cwd()
  const eslint = new ESLint()
  const relativePaths = files.map((file) => relative(cwd, file))
  const isIgnored = await Promise.all(relativePaths.map((file) => eslint.isPathIgnored(file)))
  const filteredFiles = files.filter((_, i) => !isIgnored[i])

  return filteredFiles.join(' ')
}

const eslintCommand = async (files) => {
  const filesToLint = await removeIgnoredFiles(files)

  return [`eslint -c .eslintrc.json --max-warnings=0 --fix ${filesToLint}`]
}

module.exports = {
  '**/*': 'pretty-quick --staged --verbose',
  '**/*.{js,ts,jsx,tsx,cjs,mjs}': eslintCommand,
}
