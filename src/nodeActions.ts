import * as blessed from 'blessed'
import { scrollableOptions } from './util/common'
import { installFocusHandler, onBlur, onFocus, uninstallFocusHandler } from './util/focus'

/** builds a panel with action buttons that apply to the current selected node */
export function buildNodeActions(screen: blessed.Widgets.Screen, box: blessed.Widgets.BoxElement) {
  const container = blessed.box({
    ...scrollableOptions,
    parent: box,
    border: 'line',
    keyable: true,
    focusable: true,
    keys: true,
    padding: 1,
    mouse: true,
    label: 'Actions',
    height: '33%',
    width: '100%',
    top: '66%'
  })
  const layout = blessed.layout({
    parent: container,
    layout: 'inline',
    height: '100%',
    width: '100%'
  })

  onFocus(container, screen, (actual, previous) => {
    // console.log('FOCUSSS');
    installFocusHandler('nodeActions', [b1, b2, b3], screen, ['right', 'left'], true, false)
  })
  onBlur(container, screen, (actual, previous) => {
    // console.log('BLURRRRR');
    uninstallFocusHandler('nodeActions')
  })

  const b1 = blessed.button({
    parent: layout,
    ...scrollableOptions,
    padding: 1,
    keyable: true,
    keys: true,
    mouse: true,
    style: {
      // heads up : if layout child does not have border or style it throws
      border: {
      }
    },
    valign: 'middle',
    align: 'center',
    height: '50%',
    width: '40%',
    border: 'line',
    content: 'action 1'
  })
  const b2 = blessed.button({
    ...scrollableOptions,
    parent: layout,
    padding: 1,
    style: {
      border: {
      }
    },
    valign: 'middle',
    align: 'center',
    width: '40%',
    height: '50%',
    border: 'line',
    content: 'action 2'
  })

  const b3 = blessed.button({
    ...scrollableOptions,
    parent: layout,
    padding: 1,
    keyable: true,
    keys: true,
    mouse: true,
    style: {
      // heads up : if layout child does not have border or style it throws
      border: {
      }
    },
    valign: 'middle',
    align: 'center',
    width: '40%',
    height: '50%',
    border: 'line',
    content: 'action 3'
  })
  installFocusHandler('nodeActions', [b1, b2, b3], screen, ['right', 'left'])

  return container
}
