import { installExitKeys } from 'accursed'
import { notUndefined } from 'misc-utils-of-mine-generic'
import { Store } from '../store/store'
import { createCodeView } from './codeView'
import { mainMenu } from './mainMenu'
import { createTreeView } from './treeView'
import { _installFocusHandler } from './_installFocusHandler'

export interface RenderMainViewOptions {
  dontInstallExitKeys?: boolean,
  dontInstallFocusHandler?: boolean
}

export function buildExplorer(store: Store, o: RenderMainViewOptions = {}) {
  const optionsListBar = mainMenu(store)
  const tree = createTreeView(store)
  const code = createCodeView(store)
  !o.dontInstallExitKeys && installExitKeys(store.state.screen)
  !o.dontInstallFocusHandler && _installFocusHandler('fileExplorer',
    [tree, optionsListBar, code], store.state.screen, undefined, true, true
  )
}

