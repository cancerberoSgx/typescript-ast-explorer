import * as blessed from 'blessed'
import { getCurrentView } from './store/state'
import { Store } from './store/store'
import { buttonStyle, scrollableOptions } from './util/common'
import { showInModal } from './util/modal'

/**
 * builds a panel with action buttons that apply to the current selected node
 */
export function buildNodeActions(store: Store) {
  const { screen, project } = store.state
  const view = getCurrentView(store.state)
  const { grid, verticalOffset: offset } = view

  const [top, height] = ['66%', '33%']

  const container = grid.set(
    ...(view.name === 'file' ? [6, 8, 12 - offset, 4] : [8, 0, 12 - offset, 6]),
    blessed.listbar,
    {
      style: { ...buttonStyle },
      ...scrollableOptions,
      border: 'line',
      padding: 1,
      label: 'Node Actions',
      height,
      width: '100%',
      top,
      commands: {
        Move: {
          keys: ['m'],
          callback() {
            showInModal(screen, 'Move!!')
            screen.render()
          }
        },
        Rename: {
          callback() {
            showInModal(screen, 'Rename!!')
            screen.render()
          }
        }
      }
    }
  )
  return container
}
