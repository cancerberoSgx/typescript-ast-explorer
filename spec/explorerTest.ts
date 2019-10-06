import { createStore } from '../src/store/createStore'
import { buildExplorer } from '../src/ui/projectView'
try {
  var store = createStore()
  buildExplorer(store)
  store.state.screen.render()
} catch (error) {
  console.log(error)
}
