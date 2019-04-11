import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'
import { Node } from 'ts-morph'
import { getFileRelativePath, isNode } from 'ts-simple-ast-extra'
import { mainMenu } from './mainMenu'
import { ActionListenerType, ActionType, ACTION_LISTENER } from './store/actions'
import { getCurrentView, View } from './store/state'
import { Store } from './store/store'
import { installExitKeys, onTreeNodeFocus } from './util/blessed'
import { buildTreeNode, focusStyle, scrollableOptions } from './util/common'
import { installFocusHandler } from './util/focus'
import { showInModal } from './util/modal'
const ansi = require('ansi-escape-sequences')

export function getVerticalOffset() {
  const rows = process.stdout.rows || 24
  const offset = rows < 20 ? 3 : rows < 40 ? 2 : 1
  return offset
}

/**
 * must never accept the store, since is used to build it and reset the screen (probably given one is a empty one)
 */
export function buildCodeView(screen: blessed.Widgets.Screen): View {
  return {
    verticalOffset: getVerticalOffset(),
    name: 'code',
    grid: new contrib.grid({ rows: 12, cols: 12, screen, top: 0, right: 0, bottom: 0, left: 0 })
  }
}

export function buildCodeAst(store: Store) {
  const { screen, project } = store.state
  const view = getCurrentView(store.state)
  const { grid, verticalOffset: offset, selectedNode: node } = view
  if (!isNode(node)) {
    throw new Error('Unexpected selected no kind . It is not a node selected node (directory?) in Code View')
  }
  const bar = mainMenu(store)

  const tree = grid.set(0, 0, 7 - offset, 6, contrib.tree, {
    template: { lines: true },
    label: 'Code View'
  } as contrib.Widgets.TreeOptions<TreeNode>)
  tree.rows.style = { ...(tree.rows.style || {}), ...focusStyle }
  const rootNode = {
    extended: true,
    children: {
      [getFileRelativePath(node.getSourceFile(), project)]: { ...buildTreeNode(node.getSourceFile()), expanded: true }
    }
  }
  tree.setData(rootNode)

  const editor: blessed.Widgets.ScrollableTextElement = grid.set(0, 6, 12 - offset, 6, blessed.scrollabletext, {
    ...scrollableOptions
  } as blessed.Widgets.ScrollableTextOptions)
  editor.on('click', function(data: any) {
    showInModal(screen, JSON.stringify(data) + '  ' + JSON.stringify(editor.position))
  })

  installExitKeys(screen)
  installFocusHandler('codeAst', [tree, editor, bar], screen, undefined, true, true)

  screen.render()

  store.addActionListener({
    listenerType: ActionListenerType.afterWrite,
    actionType: ActionType.NODE_SELECTION,
    id: ACTION_LISTENER.updateCodeViewOnNodeSelection,
    handle(a, s) {
      if (isNode(a.node)) {
        let text = node.getSourceFile().getFullText()
        text =
          text.substring(0, a.node.getFullStart()) +
          ansi.format(text.substring(a.node.getFullStart(), a.node.getEnd()), ['blue']) +
          text.substring(a.node.getEnd())
        if (a.node.getStartLineNumber() !== undefined) {
          editor.setScroll(Math.max(0, a.node.getStartLineNumber()) - offset)
        }
        editor.setContent(text)
      }
    }
  })

  tree.on('select', n => {
    store.dispatch({
      type: ActionType.NODE_SELECTION,
      node: n.astNode
    })
  })
  onTreeNodeFocus(tree, n => {
    store.dispatch({
      type: ActionType.NODE_SELECTION,
      node: n.astNode
    })
  })
}

interface TreeNode extends contrib.Widgets.TreeElementNode {
  astNode: Node
}
