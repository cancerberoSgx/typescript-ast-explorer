import { blessed, showInModal } from 'accursed'
import { isNode } from 'ts-simple-ast-extra'
import { getCurrentView } from '../store/state'
import { Store } from '../store/store'
import { buttonStyle } from '../util/common'
import { help } from './help'
import { replaceMainView } from '../store/createStore'

export function mainMenu(store: Store) {
  const view = getCurrentView(store.state)
  const { verticalOffset: offset, grid } = view
  // let { screen, currentView } = store.state

  const bar = grid.set(12 - offset, 0, offset, 12, blessed.listbar, {
    height: 'shrink',
    mouse: true,
    keys: true,
    style: buttonStyle,

    commands: {
      Help: {
        keys: ['h'],
        callback() {
          showInModal(store.state.screen, help())
          // store.state.screen.render()
        }
      },

      [`${view.name === 'file' ? 'Code' : 'File'} View`]: {
        keys: ['v'],
        callback() {
          const newView = view.name === 'file' ? 'code' : 'file'
          //  showInModal(                  store.state.screen,   view.name)
          try {
            if (newView === 'code' && !isNode(view.selectedNode)) {
              showInModal(store.state.screen, 'You must select a file or node before activating the code view. Do it in the tree and try again. ')
            } else {
              replaceMainView(store, newView)
              store.state.screen.render()
            }
          } catch (error) {
            console.log('ERROR', error)
            showInModal(store.state.screen, `${error} ERROR`)
          }
          store.state.screen.render()
        }
      },

      'getChildren()': {
        callback() {
          showInModal(store.state.screen, 'TODO: select ast children mode')
        }
      }
    }
  })
  bar.focus()
  store.state.screen.render()
  return bar
}

