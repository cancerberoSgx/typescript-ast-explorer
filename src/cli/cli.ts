import { buildExplorer } from '../explorer'
import { createStore } from '../store/store'
import { Options } from './cliMain'

export function main(options: Options) {
  var store = createStore()
  buildExplorer(store)
  store.state.screen.render()
}
