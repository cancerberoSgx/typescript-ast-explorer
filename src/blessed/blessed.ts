import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'
import { getObjectProperty, setObjectProperty } from '../util/misc'
import { CheckboxElement, Element } from './blessedTypes'
import { closeModal, isModalVisible } from './modal'

export function isBlessedElement(n: any): n is Element {
  return n && n.screenshot && n.enableDrag
}

export function visitDescendantNodes(node: Element, fn: (l: blessed.Widgets.Node) => boolean) {
  let stop: boolean = false
  node.children.forEach(c => {
    if (stop) {
      return
    }
    if (fn(c)) {
      stop = true
      return
    }
    if (isBlessedElement(c)) {
      visitDescendantNodes(c, fn)
    }
  })
}

export function visitDescendantElements(node: Element, fn: (l: Element) => boolean) {
  return visitDescendantNodes(node, n => (isBlessedElement(n) ? fn(n) : false))
}

export function findDescendantNode(node: Element, fn: (l: blessed.Widgets.Node) => boolean) {
  var found: blessed.Widgets.Node | undefined
  visitDescendantNodes(node, c => {
    if (fn(c)) {
      found = c
      return true
    }
    return false
  })
  return found
}

/**
 * Besides reacting for click, also will react for pressed, enter and space keys.
 */
export function onButtonClicked(b: blessed.Widgets.ButtonElement, fn: () => void) {
  b.on('pressed', e => {
    fn()
  })
  b.key(['enter', 'space'], e => {
    fn()
  })
  b.on('click', e => {
    fn()
  })
}

/**
 * @param screen install common exit keys on screen taking into account modals and other widgets that could use the same.
 */
export function installExitKeys(screen: blessed.Widgets.Screen) {
  screen.key(['escape', 'q', 'Q', 'C-c'], function(ch, key) {
    if (isModalVisible()) {
      closeModal(screen)
    } else {
      return process.exit(0)
    }
  })
}

/**
 * notifies when used "hovers" a tree node (not enter, just overs the node when navigating with arrow keys.)
 */
export function onTreeNodeFocus<T extends contrib.Widgets.TreeElementNode>(
  tree: contrib.Widgets.TreeElement<T>,
  fn: (selectedNode: T) => void
) {
  tree.rows.key(['down', 'up'], k => {
    const selectedNode =
      tree.nodeLines && tree.rows && tree.rows.selected && tree.nodeLines[tree.rows.getItemIndex(tree.rows.selected)]
    if (selectedNode) {
      fn(selectedNode)
    }
  })
}

/**
 * extract property stored on e.$ by path.
 */
export function getElementData<T>(e: Element, path: string) {
  e.$ = e.$ || {}
  return getObjectProperty(e.$, path) as T | undefined
}

/**
 * set property stored on e.$ by path.
 */
export function setElementData<T>(e: Element, path: string, value: T) {
  e.$ = e.$ || {}
  setObjectProperty(e.$, path, value)
}

export function onValueChange(el: CheckboxElement, cb: (this: CheckboxElement, value: boolean) => void) {
  function listener(this: CheckboxElement) {
    cb.apply(this, [this.checked])
  }
  el.on('check', listener)
  el.on('uncheck', listener)
  setElementData(el, 'onChangeCallback', listener)
}

export function offValueChange(el: CheckboxElement) {
  const listener = getElementData<(...args: any[]) => void>(el, 'onChangeCallback')
  if (listener) {
    el.on('unchecked', listener)
    el.off('check', listener)
  }
  setElementData(el, 'onChangeCallback', undefined)
}
