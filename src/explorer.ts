import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'
import { pwd } from 'shelljs'
import { Node, Project } from 'ts-morph'
import { GeneralNode, isNode } from 'ts-simple-ast-extra'
import { detailsPanel } from './explorerDetails'
import { mainMenu } from './mainMenu'
import { installExitKeys, onTreeNodeFocus, visitDescendantElements } from './util/blessed'
import { buildTreeNode, focusStyle } from './util/common'
import { installFocusHandler } from './util/focus'
import { getGeneralNodeKindName, getGeneralNodeName, getGeneralNodePath, notUndefined } from './util/project'
import {  getCurrentView, View } from './store/state';
import { Store } from './store/store';
import { ActionType } from './store/actions';

// interface Options {
  // project: Project
  // store: Store
  // screen: blessed.Widgets.Screen
// }


export function getVerticalOffset() {
  const rows = process.stdout.rows || 24;
  const offset = rows < 20 ? 3 : rows < 40 ? 2 : 1;
  return offset;
}

/**
 * must never accept the store, since is used to build it and reset the screen (probably given one is a empty)
 */
export function buildFileView(screen: blessed.Widgets.Screen): View {
  return {
    verticalOffset: getVerticalOffset(),
    name: 'file',
    grid:  new contrib.grid({ rows: 12, cols: 12, screen, top: 0, right: 0, bottom: 0, left: 0 })
  };
}

export function buildExplorer(store: Store) {
  // let { screen, store } = options
  const {screen, project} = store.state
  const view = getCurrentView(store.state)
  // const project = store.state.project
  // const grid =  getCurrentView(store.state) project.new contrib.grid({ rows: 12, cols: 12, screen, top: 0, right: 0, bottom: 0, left: 0 })
  const {grid, verticalOffset: offset} = view//getVerticalOffset();

  // let lastSelectedNode: GeneralNode | undefined
  // const optionsListBar = optionsForm(view.grid, screen, project, offset, () => lastSelectedNode)
  const optionsListBar = mainMenu(store)


  const tree = grid.set(0, 0, 12 - offset, 6, contrib.tree, {
    template: { lines: true },
    label: 'Files and Nodes Tree'
  } as contrib.Widgets.TreeOptions<TreeNode>)

  // TODO:the following should be done in a Dispatcher
  tree.rows.style = { ...(tree.rows.style || {}), ...focusStyle }
  const rootNode = { extended: true, ...buildTreeNode(project.getRootDirectories()[0]) }
  ;(tree as any).setData(rootNode)

  updateTreeNodeStyles(tree)
  tree.on('select', function(n: TreeNode) {
    updateTreeNodeStyles(tree)
    store.dispatch({
      type: ActionType.NODE_SELECTION,
      node: n.astNode
    })
        // selectTreeNode(n)
  })

  
  // const { table, value, actions } = buildDetails(grid, screen, 0, 6, 12 - offset, 6)
  const { table, value, actions } = detailsPanel(store)



  // console.log('value', !!value);
  
  screen.render()
  installExitKeys(screen)

  installFocusHandler('fileExplorer', [tree, table, value, actions, optionsListBar]
  .filter(notUndefined), screen, undefined, true, true)
  onTreeNodeFocus(tree, n=>{
    store.dispatch({
      type: ActionType.NODE_SELECTION,
      node: n.astNode
    })
  })

  // let lastTableData: string[][] | undefined

  // function selectTreeNode(n: TreeNode) {
  //   if (n.astNode) {
  //     if (isNode(n.astNode)) {
  //       lastSelectedNode = n.astNode
  //     }
  //     // const data = [
  //     //   ['Kind', getGeneralNodeKindName(n.astNode) || ''],
  //     //   ['Name', getGeneralNodeName(n.astNode) || ''],
  //     //   ['Position', isNode(n.astNode) ? n.astNode.getPos() + '' : ''],
  //     //   ['Path', getGeneralNodePath(n.astNode, pwd()) || ''],
  //     //   [
  //     //     'Text',
  //     //     isNode(n.astNode)
  //     //       ? n.astNode
  //     //           .getFullText()
  //     //           .substring(0, Math.max(n.astNode.getFullText().length, 200))
  //     //           .replace(/\n/gm, '\\n') || ''
  //     //       : ''
  //     //   ]
  //     // ]
  //     // table.setData({ headers: ['Property', 'Value'], data })
  //     // HEADS UP : saving the data since crappy contrib table is not storing it on setData() - just format it and loose the  parsed info
  //     // lastTableData = data
  //   }
  //   screen.render()
  // }
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
