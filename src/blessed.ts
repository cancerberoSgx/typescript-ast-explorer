import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'
import { focusStyle } from './common'

export function isBlessedElement(n: any): n is blessed.Widgets.BlessedElement {
  return n && n.screenshot && n.enableDrag
}

function updateNodeLines(node: blessed.Widgets.BlessedElement, fn: (l: string) => string) {
  node.getLines().forEach((l, i) => {
    node.setLine(i, fn(l))
  })
  node.children.forEach(c => {
    if (isBlessedElement(c)) {
      updateNodeLines(c, fn)
    }
  })
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

let lastFocus = 0
export function installFocusHandler(f: blessed.Widgets.BlessedElement[], screen: blessed.Widgets.Screen) {
  screen.key(['tab'], function(ch, key) {
    try {
      if (screen.focused) {
        ;[f[lastFocus], f[lastFocus].parent, ...(f[lastFocus].children || [])].filter(isBlessedElement).forEach(c => {
          c.style = { ...(c.style || {}), border: {} }
        })
      }
      lastFocus = lastFocus >= f.length - 1 ? 0 : lastFocus + 1
      f[lastFocus].focus()
      ;[f[lastFocus], f[lastFocus].parent, ...(f[lastFocus].children || [])].filter(isBlessedElement).forEach(c => {
        c.style = { ...(c.style || {}), ...focusStyle }
      })
      f[lastFocus].key
      screen.render()
    } catch (error) {
      console.log(error)
      throw error
    }
  })
  f[0].focus()
  ;[f[0], f[0].parent, ...(f[0].children || [])].filter(isBlessedElement).forEach(c => {
    c.style = { ...(c.style || {}), ...focusStyle }
  })
}

export function modal(screen: blessed.Widgets.Screen, s: string | blessed.Widgets.BlessedElement) {
  if (!modalInstance) {
    modalInstance = blessed.prompt({
      mouse: true,
      parent: screen,
      top: 'center',
      left: 'center',
      height: 'shrink',
      width: 'shrink',
      keys: true,
      vi: true,
      tags: true,
      border: 'line',
      hidden: true
    })
    ;[modalInstance, ...modalInstance.children].forEach(c => c.on('click', data => modalInstance!.hide()))
  }
  if (typeof s === 'string') {
    modalInstance.setContent(s)
  } else {
    if (lastModalContent) {
      modalInstance.remove(lastModalContent)
    }
    lastModalContent = s
    modalInstance.append(s)
  }
  modalInstance.show()
  screen.render()
}
let modalInstance: blessed.Widgets.PromptElement | undefined
let lastModalContent: blessed.Widgets.BlessedElement | undefined

export function closeModal(screen: blessed.Widgets.Screen) {
  if (modalInstance) {
    modalInstance.hide()
  }
  screen.render()
}
export function isModalVisible() {
  return modalInstance && modalInstance.visible
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

export function onTreeNodeFocus<T>(tree: contrib.Widgets.TreeElement, fn: (selectedNode: T) => void) {
  tree.rows.key(['down', 'up'], k => {
    const selectedNode =
      // @ts-ignore
      tree.nodeLines && tree.rows && (tree.nodeLines[tree.rows.getItemIndex(tree.rows.selected || 0)] as any)
    if (selectedNode) {
      fn(selectedNode)
    }
  })
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
