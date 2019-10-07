import { blessed, contrib, Screen } from 'accursed'
import { Project } from 'ts-morph'
import { nodeSelectionDispatcher } from './nodeSelection'
import { State, View } from './state'
import { Store, StoreImpl } from './store'
import { ConcreteOptions } from '../cli/cli'

export function createStore(o: Partial<CreateInitialStateOptions> = {}) {
  const allReducers = [nodeSelectionDispatcher]
  const store = new StoreImpl(createInitialState(o))
  allReducers.forEach(r => {
    store.addActionListener(r)
  })
  return store
}

export interface CreateInitialStateOptions extends Partial<ConcreteOptions> {
  screen: Screen
  project: Project
  store?: Store
}

export function createInitialState(o: Partial<CreateInitialStateOptions> = {}): State {
  const screen = o.screen || blessed.screen({ smartCSR: true })
  const project = o.project || new Project({ 
    tsConfigFilePath: o.tsConfig ||'./tsconfig.json', 
    addFilesFromTsConfig: true 
    })
  return {
    project,
    screen,
    view: createMainView(screen),
  }
}

function createMainView(screen: blessed.Widgets.Screen): View {
  const rows = process.stdout.rows || 24
  const verticalOffset = rows < 20 ? 3 : rows < 40 ? 2 : 1
  return {
    verticalOffset,
    grid: new contrib.grid({ rows: 12, cols: 12, screen, top: 0, right: 0, bottom: 0, left: 0 })
  }
}

