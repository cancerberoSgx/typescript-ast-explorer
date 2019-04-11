import { buildExplorer } from '../src/explorer'
import { createStore } from '../src/store/store'

var store = createStore()
buildExplorer(store)
store.state.screen.render()
