import { main } from './cli';

export interface Options {
  help?: boolean
}
function cliMain() {
  const options = require('yargs-parser')(process.argv.slice(2)) as Options
  if (options.help) {
    printHelp()
    process.exit(0)
  }
  main(options)
}

function printHelp() {
  console.log(`
Usage:

  cd some/typescript/project
  typescript-ast-explorer
  `)
}
try {
  cliMain()
} catch (error) {
  console.error('Error: ' + error)
  error.stack && console.log(error.stack.split('\n').join('\n'))
  process.exit(1)
}
