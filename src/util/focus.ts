import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'
import { focusStyle } from './common'
import { closeModal, isModalVisible } from './modal'
import { isBlessedElement } from './blessed';
/**
 * since blur focus event doesnt work on my terminal - this will poll screen.focused and notify when focus is gone or begin
 */
export function onBlur(el: blessed.Widgets.BlessedElement, screen: blessed.Widgets.Screen, fn: (focused?: blessed.Widgets.BlessedElement, previous?: blessed.Widgets.BlessedElement) => void, emitNow: boolean = false) {
  onFocusChange(screen, (actual, previous) => {
    if (previous === el && actual !== el) {
      fn(actual, lastFocused);
    }
  })
  if (emitNow && screen.focused !== el) {
    fn(screen.focused, lastFocused);
  }
}
/**
 * since blur focus event doesnt work on my terminal - this will poll screen.focused and notify when focus is gone or begin
 */
export function onFocus(el: blessed.Widgets.BlessedElement, screen: blessed.Widgets.Screen, fn: OnFocusChangeListener, emitNow: boolean = false) {
  onFocusChange(screen, (actual, previous) => {
    if (previous !== el && actual === el) {
      fn(actual, lastFocused);
    }
  })
  if (emitNow && screen.focused === el) {
    fn(screen.focused, lastFocused);
  }
}
type OnFocusChangeListener = (focused?: blessed.Widgets.BlessedElement, previous?: blessed.Widgets.BlessedElement) => void
/**
 * since blur focus event doesnt work on my terminal - this will poll screen.focused and notify when focus is gone or begin
TODO: offFocusChange()
 */
export function onFocusChange(screen: blessed.Widgets.Screen, fn: OnFocusChangeListener) {
  lastFocused = lastFocused || screen.focused;
  if (typeof onFocusChangeTimer === 'undefined') {
    onFocusChangeTimer = setInterval(() => {
      if (lastFocused !== screen.focused) {
        onFocusChangeListeners.forEach(l => l(screen.focused, lastFocused))
      }
      lastFocused = screen.focused
    }, onFocusChangeInterval)
  }
  if(!onFocusChangeListeners.includes(fn)){
    onFocusChangeListeners.push(fn)
  }
}
const onFocusChangeListeners: OnFocusChangeListener[] = []
let onFocusChangeInterval = 500;
export function setOnFocusChangeInterval(t: number) {
  onFocusChangeInterval = t;
}
let onFocusChangeTimer: NodeJS.Timeout | undefined = undefined
let lastFocused: blessed.Widgets.BlessedElement;




let lastFocus: { [id: string]: number } = {}

export function uninstallFocusHandler(
  focusId: string,
) {
  if (typeof lastFocus[focusId] === 'undefined') {
    console.log('Cannot uninstall focus handler that is not yet installed: ' + focusId);
    throw new Error('Cannot uninstall focus handler that is not yet installed: ' + focusId)
  }
  lastFocus[focusId] = -Infinity
}

export function installFocusHandler(
  focusId: string,
  elements: blessed.Widgets.BlessedElement[],
  screen: blessed.Widgets.Screen,
  keys: [string, string] = ['tab', 'S-tab'],
  styleChildren = true,
  focusFirst = false
) {
  // console.log('installFocusHandler, ', focusId, lastFocus[focusId], lastFocus)


  if (lastFocus[focusId] === -Infinity && typeof lastFocus[focusId] !== 'undefined') {
    // console.log('Focus handler with key already installed: ' + focusId);
    throw new Error('Focusq handler with key already installed: ' + focusId)
  }

  else if (lastFocus[focusId] === -Infinity || typeof lastFocus[focusId] === 'undefined') {
  // console.log('installFocusHandler2, ', focusId, lastFocus[focusId], lastFocus)

  // if (typeof lastFocus[focusId] === 'undefined') {
    lastFocus[focusId] = 0

      // console.log('installFocusHandler3, ', focusId, lastFocus[focusId], lastFocus), keys

      screen.key(keys, function (ch, key) {
        try {

          // console.log('KEY', key);
          
          // always remove the "selected " visual feedback
          if (screen.focused) {
            const notFocused = elements.filter(e=>e && e!==screen.focused)
            //TODO: better is to check on the other lastFocus[IDS] and unselect all!
            ;[...notFocused, ...(styleChildren ? notFocused.map(e=>e.children).flat() : [])]
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

                // console.log('new lastFocus[focusId]');
                
            // otherwise we assume that key press was for us. TODO: are we certain ? TODO: what if other keys have register with the same key ? we should check which is more close to the real focused
            
            elements[lastFocus[focusId]].focus()

              ;[elements[lastFocus[focusId]], ...(styleChildren ? elements[lastFocus[focusId]].children : [])]
                .filter(isBlessedElement)
                .forEach(c => {
                  c.style = { ...(c.style || {}), ...focusStyle }
                })
            screen.render()
          }
        } catch (error) {
          console.log(error)
          throw error
        }
      })
      
      if (focusFirst) {
        elements[0].focus()
          ;[elements[0], ...(styleChildren ? elements[0].children : [])].filter(isBlessedElement).forEach(c => {
            c.style = { ...(c.style || {}), ...focusStyle }
          })
      }

    }
  // }

}
