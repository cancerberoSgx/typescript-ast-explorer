import { blessed, contrib, Screen } from 'accursed'
import { Project, Node } from 'ts-morph'
import { nodeSelectionDispatcher } from './nodeSelection'
import { State, View, ViewType } from './state'
import { Store, StoreImpl } from './store'
import { _resetFocusManager } from '../ui/_installFocusHandler'
import { buildCodeAst } from '../ui/codeView'
import { buildExplorer } from '../ui/projectView'

export function createStore(o: Partial<CreateInitialStateOptions> = {}) {
  const allReducers = [nodeSelectionDispatcher]
  const store = new StoreImpl(createInitialState(o))
  allReducers.forEach(r => {
    store.addActionListener(r)
  })
  return store
}

export interface CreateInitialStateOptions {
  screen: Screen
  project: Project
  store?: Store
}

export function createInitialState(o: Partial<CreateInitialStateOptions> = {}): State {
  const screen = o.screen || blessed.screen({ smartCSR: true })
  const project = o.project || new Project({ tsConfigFilePath: './tsconfig.json', addFilesFromTsConfig: true })
  return {
    project,
    screen,
    fileView: createMainView(screen, 'file'),
    codeView: createMainView(screen,'code')
  }
}

export function replaceMainView<T extends ViewType, R extends ('code' extends T ? ReturnType<typeof buildCodeAst> : ReturnType<typeof buildExplorer>)>(store: Store, view: T): R{
    store.state.currentView = view
   resetScreen(store)
    // store.state.v
    const views = view === 'code' ? buildCodeAst(store) :  buildExplorer(store)
    return views as R
}

/**
 * Dirty hack needed to re-render the application in a new screen without destroying the project.
 */
function resetStore(store: Store, screen: Screen) {
  Object.assign(store.state, {
    ...store.state,
    screen,
    fileView: {
      ...store.state.fileView,
      ...createMainView(screen, 'file')
    },
    codeView: {
      ...store.state.codeView,
      ...createMainView(screen,'code')
    }
  })
}

function createMainView(screen: blessed.Widgets.Screen, name: ViewType): View {
  const rows = process.stdout.rows || 24
  const verticalOffset = rows < 20 ? 3 : rows < 40 ? 2 : 1
  return {
    verticalOffset,
    name,
    grid: new contrib.grid({ rows: 12, cols: 12, screen, top: 0, right: 0, bottom: 0, left: 0 })
  }
}
/**
 * Dirty hack to create a new screen and render current app there, destroy the current one and regenerate
 * everything, with the exception of the Project
 */
 function resetScreen(store: Store) {
  _resetFocusManager()
  store.state.screen.clearRegion(    0,    parseInt(store.state.screen.width + ''),
    0,    parseInt(store.state.screen.height + '')  )
  store.state.screen.render()
  store.state.screen.destroy()
  var screen = blessed.screen({ smartCSR: true })
  resetStore(store, screen)
}
 


// /**
//  * must never accept the store, since is used to build it and reset the screen (probably given one is a empty)
//  */
// function buildFileView(screen: blessed.Widgets.Screen): View {
//   const rows = process.stdout.rows || 24
//   const verticalOffset = rows < 20 ? 3 : rows < 40 ? 2 : 1
//   return {
//     verticalOffset,
//     name: 'file',
//     grid: new contrib.grid({ rows: 12, cols: 12, screen, top: 0, right: 0, bottom: 0, left: 0 })
//   }
// }

// /**
//  * must never accept the store, since is used to build it and reset the screen (probably given one is a empty
//  * one)
//  */
// function buildCodeView(screen: blessed.Widgets.Screen): View {
//   const rows = process.stdout.rows || 24
//   const verticalOffset = rows < 20 ? 3 : rows < 40 ? 2 : 1
//   return {
//     verticalOffset,
//     name: 'code',
//     grid: new contrib.grid({ rows: 12, cols: 12, screen, top: 0, right: 0, bottom: 0, left: 0 })
//   }
// }
