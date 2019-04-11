import * as blessed from 'blessed'
import { buttonStyle, scrollableOptions } from './util/common'
import { showInModal } from './util/modal'

/** 
 * builds a panel with action buttons that apply to the current selected node 
 */
export function buildNodeActions(screen: blessed.Widgets.Screen, box: blessed.Widgets.BoxElement, top: string, height: string) {
  const container = blessed.listbar({
    style: { ...buttonStyle },
    ...scrollableOptions,
    parent: box,
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
  })
  return container
}
