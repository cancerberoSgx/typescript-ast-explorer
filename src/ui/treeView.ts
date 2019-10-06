import { contrib, onTreeNodeFocus } from 'accursed'
import { GeneralNode } from 'ts-simple-ast-extra'
import { ActionType } from '../store/actions'
import { Store } from '../store/store'
import { buildTreeNode, focusStyle } from '../util/common'
import { visitDescendantElements } from '../util/misc'

export function createTreeView(store: Store): contrib.Widgets.TreeElement<TreeNode> {
  const { screen, project, view } = store.state
  const { grid, verticalOffset: offset } = view
  const tree = grid.set(0, 0, 12 - offset, 6, contrib.tree, {
    template: { lines: true },
    label: 'Project View',
    border: 'line',
    focusable: true,
  } as contrib.Widgets.TreeOptions<TreeNode>) as contrib.Widgets.TreeElement<TreeNode>
  tree.rows.style = { ...(tree.rows.style || {}), ...focusStyle }
  const rootNode = { extended: true, ...buildTreeNode(project.getRootDirectories()[0] as any) }
  tree.setData(rootNode)
  onTreeNodeFocus(tree, n => {
    store.dispatch({
      type: ActionType.NODE_SELECTION,
      node: n.astNode
    })
  })
  updateTreeNodeStyles(tree)
  tree.on('select', function(n: TreeNode) {
    updateTreeNodeStyles(tree)
    store.dispatch({
      type: ActionType.NODE_SELECTION,
      node: n.astNode
    })
  })
  return tree
}
interface TreeNode extends contrib.Widgets.TreeElementNode {
  astNode: GeneralNode;
}
function updateTreeNodeStyles(tree: contrib.Widgets.TreeElement<TreeNode>) {
  visitDescendantElements(tree, e => {
    const content = e.getContent()
    if (content.includes('Directory ') || content.includes('SourceFile ')) {
      e.style.fg = 'yellow'
    }
    else {
      e.style.fg = 'white'
    }
    return false
  })
}
