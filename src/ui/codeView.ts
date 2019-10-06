import { blessed, contrib, installExitKeys, onTreeNodeFocus, showInModal } from 'accursed'
import { Node } from 'ts-morph'
import { getRelativePath, isNode } from 'ts-simple-ast-extra'
import { ActionType, ACTION_LISTENER } from '../store/actions'
import { getCurrentView } from '../store/state'
import { ActionListenerType, Store } from '../store/store'
import { buildTreeNode, focusableBorderedOpts, scrollableOptions } from '../util/common'
import { detailsPanel } from './detailsPanel'
import { mainMenu } from './mainMenu'
import { _installFocusHandler } from './_installFocusHandler'
const ansi = require('ansi-escape-sequences')

export function buildCodeAst(store: Store) {
  const { screen, project } = store.state
  const view = getCurrentView(store.state)
  const { grid, verticalOffset: offset, selectedNode: node } = view
  if (!isNode(node)) {
    throw new Error('Unexpected selected no kind . It is not a node selected node (directory?) in Code View')
  }
  const bar = mainMenu(store)
  const tree = grid.set(0, 0, 5, 6, contrib.tree, {
    template: { lines: true },
    label: 'Code View'
  } as contrib.Widgets.TreeOptions) as contrib.Widgets.TreeElement<TreeNode>
  tree.rows.style = { ...(tree.rows.style || {}), ...focusableBorderedOpts().style }
  const rootNode = {
    extended: true,
        expanded: true,
    children: {
      [getRelativePath(node.getSourceFile().getFilePath(), project)]: {
        ...buildTreeNode(node.getSourceFile()),
        expanded: true,
        extended: true,
      }
    }
  }
  tree.setData(rootNode as any)

  const editor: blessed.Widgets.ScrollableTextElement = grid.set(0, 6, 12 - offset - 3, 6, blessed.scrollabletext, {
    ...focusableBorderedOpts(),
    ...scrollableOptions()
  } as blessed.Widgets.ScrollableTextOptions)
  editor.on('click', function(data: any) {
    showInModal(screen, JSON.stringify(data) + '  ' + JSON.stringify(editor.position))
  })

  const { table, value, actions } = detailsPanel(store)

  installExitKeys(screen)
  _installFocusHandler('codeAst', [tree, editor, bar , table, value, actions ], screen, undefined, true, true)

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

  return {tree, editor, bar , table, value, actions }
}

interface TreeNode extends contrib.Widgets.TreeElementNode {
  astNode: Node
}
