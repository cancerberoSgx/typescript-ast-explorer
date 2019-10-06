import { createStore } from '../store/createStore'
import { buildExplorer } from '../ui/projectView'

export interface Options {
  help?: boolean
}

export function main() {
  const options = require('yargs-parser')(process.argv.slice(2)) as Options
  if (options.help) {
    printHelp()
    process.exit(0)
  }
  var store = createStore()
  buildExplorer(store)
  store.state.screen.render()
}

function printHelp() {
  console.log(`
Usage:

  cd some/typescript/project
  typescript-ast-explorer
  `)
}
