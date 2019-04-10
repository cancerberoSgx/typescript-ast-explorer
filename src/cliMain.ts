// import { main } from '../main'
// import { parseArgs, RawArgs } from './parseArgs'

import * as blessed from 'blessed';
import { Project } from 'ts-morph';
import { buildExplorer } from './explorer';

interface Options {
  help?: boolean
}
function cliMain() {
  const options = require('yargs-parser')(process.argv.slice(2)) as Options
  // const options = parseArgs(args)
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

function main(options: Options){

var screen = blessed.screen({ smartCSR: true });
const project = new Project({ tsConfigFilePath: './tsconfig.json', addFilesFromTsConfig: true });
buildExplorer({ project, screen });
screen.render();

}

try {
  cliMain()
} catch (error) {
  console.error('Error: ' + error)
  error.stack && console.log(error.stack.split('\n').join('\n'))
  process.exit(1)
}
