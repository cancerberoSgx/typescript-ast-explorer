import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'
import { closeModal, isModalVisible } from './modal'

export function isBlessedElement(n: any): n is blessed.Widgets.BlessedElement {
  return n && n.screenshot && n.enableDrag
}

function visitDescendantNodes(node: blessed.Widgets.BlessedElement, fn: (l: blessed.Widgets.Node) => boolean) {
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

export function visitDescendantElements(
  node: blessed.Widgets.BlessedElement,
  fn: (l: blessed.Widgets.BlessedElement) => boolean
) {
  return visitDescendantNodes(node, n => (isBlessedElement(n) ? fn(n) : false))
}

export function findDescendantNode(node: blessed.Widgets.BlessedElement, fn: (l: blessed.Widgets.Node) => boolean) {
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

export function isFocused(screen: blessed.Widgets.Screen, el: blessed.Widgets.BlessedElement) {
  return el === screen.focused || el.hasDescendant(screen.focused)
}

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

export function installExitKeys(screen: blessed.Widgets.Screen) {
  screen.key(['escape', 'q', 'Q', 'C-c'], function(ch, key) {
    if (isModalVisible()) {
      closeModal(screen)
    } else {
      return process.exit(0)
    }
  })
}

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
