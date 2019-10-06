import { blessed, showInModal } from 'accursed'
import { Store } from '../store/store'
import { buttonStyle } from '../util/common'
import { help } from './help'

export function mainMenu(store: Store) {
  const view = store.state.view
  const { verticalOffset: offset, grid } = view

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

