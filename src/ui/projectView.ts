import { contrib, installExitKeys, onTreeNodeFocus } from 'accursed'
import { GeneralNode } from 'ts-simple-ast-extra'
import { ActionType } from '../store/actions'
import { getCurrentView } from '../store/state'
import { Store } from '../store/store'
import { buildTreeNode, focusStyle } from '../util/common'
import { visitDescendantElements } from '../util/misc'
import { detailsPanel } from './detailsPanel'
import { mainMenu } from './mainMenu'
import { _installFocusHandler } from './_installFocusHandler'
import { notUndefined } from 'misc-utils-of-mine-generic'

export interface RenderMainViewOptions {
  dontInstallExitKeys?: boolean,
  dontInstallFocusHandler?: boolean
}

export function buildExplorer(store: Store, o: RenderMainViewOptions = {}) {
  const { screen, project } = store.state
  const view = getCurrentView(store.state)
  const { grid, verticalOffset: offset } = view
  const optionsListBar = mainMenu(store)

  const tree = grid.set(0, 0, 12 - offset, 6, contrib.tree, {
    template: { lines: true },
    label: 'Project View',
    border: 'line',
    focusable: true,
  } as contrib.Widgets.TreeOptions<TreeNode>) as contrib.Widgets.TreeElement<TreeNode>

  // TODO:the following should be done in a Dispatcher
  tree.rows.style = { ...(tree.rows.style || {}), ...focusStyle }
  const rootNode = { extended: true, ...buildTreeNode(project.getRootDirectories()[0] as any) }
  tree.setData(rootNode)

  updateTreeNodeStyles(tree)
  tree.on('select', function(n: TreeNode) {
    updateTreeNodeStyles(tree)
    store.dispatch({
      type: ActionType.NODE_SELECTION,
      node: n.astNode
    })
  })

  const { table, value, actions } = detailsPanel(store)
  !o.dontInstallExitKeys && installExitKeys(screen)
  !o.dontInstallFocusHandler && _installFocusHandler(
    'fileExplorer',
    [tree,   table, value, actions, optionsListBar].filter(notUndefined),
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
  return { tree,  optionsListBar, table, value, actions }
}

interface TreeNode extends contrib.Widgets.TreeElementNode {
  astNode: GeneralNode
}

function updateTreeNodeStyles(tree: contrib.Widgets.TreeElement<TreeNode>) {
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

