import { Screen } from 'accursed'
import { Node, Project } from 'ts-morph'
import { CreateInitialStateOptions, createStore } from './store/createStore'
import { Store } from './store/store'
import { buildExplorer, RenderMainViewOptions } from './ui/projectView'

interface Options extends CreateInitialStateOptions, RenderMainViewOptions {
}

export class ProjectView implements Required<Options> {
  screen: Screen = null as any
  project: Project = null as any
  store: Store = null as any
  views: ReturnType<typeof buildExplorer> = null as any
  dontInstallExitKeys = true
  dontInstallFocusHandler = false
  debug = false
  help = false
  tsConfig : string= null as any

  constructor(o: Options) {
    Object.assign(this, o)
  }

  render() {
    this.store = createStore(this)
    this.views = buildExplorer(this.store, this)
    this.screen.render()
  }
}
