import { blessed, Element, isBlessedElement } from 'accursed'
import { focusStyle } from '../util/common'

let lastFocus: { [id: string]: number } = {}
/**
 * Need this hack function instead of accursed to make the old code work based on contrib.grid/tree/table.
 */
export function _installFocusHandler(focusId: string, elements: Element[], screen: blessed.Widgets.Screen, keys: [string, string] = ['tab', 'S-tab'], styleChildren = true, focusFirst = false) {
  if (lastFocus[focusId] === -Infinity && typeof lastFocus[focusId] !== 'undefined') {
    throw new Error('Focus handler with key already installed: ' + focusId)
  }
  else if (lastFocus[focusId] === -Infinity || typeof lastFocus[focusId] === 'undefined') {
    lastFocus[focusId] = 0
    screen.key(keys, function(ch, key) {
      try {
        if (screen.focused) {
          const notFocused = elements.filter(e => e && e !== screen.focused);
          [...notFocused, ...(styleChildren ? notFocused.map(e => e.children).flat() : [])]
            .filter(e => screen.focused !== e)
            .filter(isBlessedElement)
            .forEach(c => {
              c.style = { ...(c.style || {}), border: {} }
            })
        }
        // if they had uninstalled we don't do more
        if (lastFocus[focusId] !== -Infinity) {
          lastFocus[focusId] = key.shift
            ? lastFocus[focusId] <= 0
              ? elements.length - 1
              : lastFocus[focusId] - 1
            : lastFocus[focusId] >= elements.length - 1
              ? 0
              : lastFocus[focusId] + 1
          // otherwise we assume that key press was for us.
          // TODO: are we certain ?
          // TODO: what if other keys have register with the same key ? we should check which is more close to the real focused
          elements[lastFocus[focusId]].focus();
          [elements[lastFocus[focusId]], ...(styleChildren ? elements[lastFocus[focusId]].children : [])]
            .filter(isBlessedElement)
            .forEach(c => {
              c.style = { ...(c.style || {}), ...focusStyle }
            })
          screen.render()
        }
      }
      catch (error) {
        console.log(error)
        throw error
      }
    })
    if (focusFirst) {
      elements[0].focus();
      [elements[0], ...(styleChildren ? elements[0].children : [])].filter(isBlessedElement).forEach(c => {
        c.style = { ...(c.style || {}), ...focusStyle }
      })
    }
  }
}


/**
 * Need this hack function instead of accursed to make the old code work based on contrib.grid/tree/table.
 */
export function _resetFocusManager() {
  lastFocus = {}
}