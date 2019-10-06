import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'
import { GeneralNode } from 'ts-simple-ast-extra'
import { installExitKeys, onTreeNodeFocus, visitDescendantElements } from '../blessed/blessed'
import { installFocusHandler } from '../blessed/focus'
import { ActionType } from '../store/actions'
import { getCurrentView, View } from '../store/state'
import { Store } from '../store/store'
import { buildTreeNode, focusStyle } from '../util/common'
import { notUndefined } from '../util/misc'
import { detailsPanel } from './detailsPanel'
import { mainMenu } from './mainMenu'

/**
 * must never accept the store, since is used to build it and reset the screen (probably given one is a empty)
 */
export function buildFileView(screen: blessed.Widgets.Screen): View {
  const rows = process.stdout.rows || 24
  const verticalOffset = rows < 20 ? 3 : rows < 40 ? 2 : 1
  return {
    verticalOffset,
    name: 'file',
    grid: new contrib.grid({ rows: 12, cols: 12, screen, top: 0, right: 0, bottom: 0, left: 0 })
  }
}

export function buildExplorer(store: Store) {
  const { screen, project } = store.state
  const view = getCurrentView(store.state)
  const { grid, verticalOffset: offset } = view
  const optionsListBar = mainMenu(store)

  const tree = grid.set(0, 0, 12 - offset, 6, contrib.tree, {
    template: { lines: true },
    label: 'Project View'
  } as contrib.Widgets.TreeOptions<TreeNode>)

  // TODO:the following should be done in a Dispatcher
  tree.rows.style = { ...(tree.rows.style || {}), ...focusStyle }
  const rootNode = { extended: true, ...buildTreeNode(project.getRootDirectories()[0] as any) }
    ; (tree as any).setData(rootNode)

  updateTreeNodeStyles(tree)
  tree.on('select', function(n: TreeNode) {
    updateTreeNodeStyles(tree)
    store.dispatch({
      type: ActionType.NODE_SELECTION,
      node: n.astNode
    })
  })

  const { table, value, actions } = detailsPanel(store)
  screen.render()
  installExitKeys(screen)

  installFocusHandler(
    'fileExplorer',
    [tree, table, value, actions, optionsListBar].filter(notUndefined),
    screen,
    undefined,
    true,
    true
  )
  onTreeNodeFocus(tree, n => {
    store.dispatch({
      type: ActionType.NODE_SELECTION,
      node: n.astNode
    })
  })
}

interface TreeNode extends contrib.Widgets.TreeElementNode {
  astNode: GeneralNode
}

export function updateTreeNodeStyles(tree: contrib.Widgets.TreeElement<TreeNode>) {
  visitDescendantElements(tree, e => {
    const content = e.getContent()
    if (content.includes('Directory ') || content.includes('SourceFile ')) {
      e.style.fg = 'yellow'
    } else {
      e.style.fg = 'white'
    }
    return false
  })
}
