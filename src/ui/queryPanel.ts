// import * as blessed from 'blessed'
// import { getCurrentView } from '../store/state'
// import { Store } from '../store/store'
// import { buttonStyle, scrollableOptions } from '../util/common'
// import { showInModal } from '../util/modal'

// /**
//  * builds a panel with action buttons that apply to the current selected node
//  */
// export function buildNodeActions(store: Store) {
//   const { screen, project } = store.state
//   const view = getCurrentView(store.state)
//   const { grid, verticalOffset: offset } = view
//   const gridPosition =[8, 6, 3, 6] // same in both view.name === 'file' ? [12 - offset, 6, offset, 6] :  [9, 6, 12 - offset, offset]
//   const container = grid.set(
//     ...gridPosition,
//     blessed.listbar,
//     {
//       style: { ...buttonStyle },
//       ...scrollableOptions,
//       border: 'line',
//       padding: 1,
//       draggable: true,
//       label: 'Node Actions',
//       width: '100%',
//       commands: {
//         Move: {
//           keys: ['m'],
//           callback() {
//             showInModal(screen, 'Move!!')
//             screen.render()
//           }
//         },
//         Rename: {
//           callback() {
//             showInModal(screen, 'Rename!!')
//             screen.render()
//           }
//         }
//       }
//     }
//   )
//   return container
// }
