import { buildCodeAst } from '../src/codeAst'
import { createStore } from '../src/store/store'
try {
  var store = createStore()
  buildCodeAst(store)
  store.state.screen.render()
} catch (error) {
  console.log(error)
}
