import * as blessed from 'blessed'
import { buttonStyle, scrollableOptions } from './util/common'
import { showInModal } from './util/modal'
import { Store } from './store/store';
import { getCurrentView } from './store/state';

/** 
 * builds a panel with action buttons that apply to the current selected node 
 */
export function buildNodeActions(store: Store) {
  const {screen, project} = store.state
  const view = getCurrentView(store.state)
  const {grid, verticalOffset: offset} = view
  
  const [top, height] = ['66%', '33%']

      // grid.set(view.name==='file' ?  [ 5, 6, 12 - offset, 8]: [ 8, 0, 12 - offset, 6] ,contrib.table, {
        const container =   grid.set(...(view.name==='file' ?  [ 6, 8, 12 - offset, 4]: [ 8, 0, 12 - offset, 6]) ,blessed.listbar, {


  // const container = blessed.({
    style: { ...buttonStyle },
    ...scrollableOptions,
    // parent: box,
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
