import * as blessed from 'blessed'
import { isNode } from 'ts-simple-ast-extra'
import { help } from '../options/help'
import { getCurrentView } from '../store/state'
import { Store } from '../store/store'
import { buttonStyle, resetScreen } from '../util/common'
import { showInModal } from '../util/modal'
import { buildCodeAst } from './codeView'
import { buildExplorer } from './projectView'

export function mainMenu(store: Store) {
  const view = getCurrentView(store.state)
  const { verticalOffset: offset, grid } = view
  let { screen, currentView } = store.state

  const bar = grid.set(12 - offset, 0, offset, 12, blessed.listbar, {
    height: 'shrink',
    mouse: true,
    keys: true,
    style: buttonStyle,
    commands: {
      Help: {
        keys: ['h'],
        callback() {
          const markdown = help()
          showInModal(screen, markdown)
          screen.render()
        }
      },
      [`${view.name === 'file' ? 'Code' : 'File'} View`]: {
        keys: ['v'],
        callback() {
          try {
            if (view.name === 'file') {
              // TODO: ACTION AND DISPATCHER for this:
              if (isNode(view.selectedNode)) {
                resetScreen(store)
                store.state.currentView = 'code'
                buildCodeAst(store)
                store.state.screen.render()
              } else {
                showInModal(
                  screen,
                  'You must select a file or node before activating the code view. Do it in the tree and try again. '
                )
              }
            } else {
              // TODO: ACTION AND DISPATCHER for this:
              resetScreen(store)
              store.state.currentView = 'file'
              buildExplorer(store)
              store.state.screen.render()
            }
          } catch (error) {
            console.log('ERROR', error)
            showInModal(store.state.screen, `${error} ERROR`)
          }
        }
      },
      'getChildren()': {
        callback() {
          screen.render()
        }
      }
    }
  })

  bar.focus()
  screen.render()
  return bar
}
