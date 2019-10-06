import { createStore } from '../store/createStore'
import { buildExplorer } from '../ui/projectView'
import { Options } from './cliMain'

export function main(options: Options) {
  var store = createStore()
  buildExplorer(store)
  store.state.screen.render()
}
