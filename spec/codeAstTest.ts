import * as blessed from 'blessed'
import { Project } from 'ts-morph'
import { buildCodeAst } from '../src/codeAst'
import { longText } from './assets/project1/src/text'
import { createStore } from '../src/store/store';
try {

var store = createStore()
buildCodeAst(store )
store.state.screen.render()

  // var screen = blessed.screen({ smartCSR: true })
  // const project = new Project()
  // const f = project.createSourceFile('foo.ts', longText() + '\nexport const ggg = 1\n')
  // buildCodeAst({ project, node: f, screen })
  // screen.render()
} catch (error) {
  console.log(error)
}
