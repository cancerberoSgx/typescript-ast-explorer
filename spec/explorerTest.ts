import { buildExplorer } from '../src/explorer'
import { createStore } from '../src/store/store'
try {
  var store = createStore()
  buildExplorer(store)
  store.state.screen.render()
} catch (error) {
  console.log(error)
}
