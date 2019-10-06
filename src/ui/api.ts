import { Screen } from 'accursed'
import { Project, SourceFile, Node } from 'ts-morph'
import { CreateInitialStateOptions, createStore } from '../store/createStore'
import { Store } from '../store/store'
import { buildExplorer, RenderMainViewOptions } from './projectView'

interface Options extends CreateInitialStateOptions, RenderMainViewOptions {
}

export class ProjectView implements Required<Options> {
  screen: Screen = null as any
  project: Project = null as any
  store: Store = null as any
  views: ReturnType<typeof buildExplorer> = null as any
  dontInstallExitKeys = true
  dontInstallFocusHandler = false

  constructor(o: Options) {
    Object.assign(this, o)
  }

  render() {
    this.store = createStore(this)
    this.views = buildExplorer(this.store, this)
    this.screen.render()
  }
}

interface FileViewOptions extends Options {
selectedNode: Node
}
export class FileView implements Required<FileViewOptions> {
  screen: Screen = null as any
  project: Project = null as any
  store: Store = null as any
  views: ReturnType<typeof buildExplorer> = null as any
  dontInstallExitKeys = true
  dontInstallFocusHandler = false
  selectedNode: Node= null as any

  constructor(o: FileViewOptions) {
    Object.assign(this, o)
  }

  render() {
    this.store = createStore(this)
    this.views = buildExplorer(this.store, this)
    this.screen.render()
  }
}
