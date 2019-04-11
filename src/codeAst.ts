import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'
import { Node, Project } from 'ts-morph'
import { optionsForm } from './options/options'
import { installExitKeys, onTreeNodeFocus } from './util/blessed'
import { buildTreeNode, focusStyle, scrollableOptions } from './util/common'
import { installFocusHandler } from './util/focus'
import { showInModal } from './util/modal'
import { buildDetails } from './explorerDetails';
import { buildNodeActions } from './nodeActions';
import { ActionListenerType, ActionType, ACTION_LISTENER } from './store/actions';
import { isNode } from 'ts-simple-ast-extra';
import { getCurrentView } from './store/state';
import { Store } from './store/store';
const ansi = require('ansi-escape-sequences')


export function getVerticalOffset() {
  const rows = process.stdout.rows || 24;
  const offset = rows < 20 ? 3 : rows < 40 ? 2 : 1;
  return offset;
}


export function buildCodeAst(store: Store) {
  // const rows = process.stdout.rows || 24
  // const offset = rows < 20 ? 3 : rows < 40 ? 2 : 1
  const {screen, project} = store.state
  const view = getCurrentView(store.state)
  const {grid, verticalOffset: offset, selectedNode: node} = view
  // const{node, grid} = view
  // let lastSelectedNode:Node|undefined
  // const focusStyle = {
  //   border: {
  //     type: 'line',
  //     fg: 'red'
  //   }
  // }
  if(!isNode(node)){
    throw new Error('Unespected not Node Genreal node (directory?) in Code View')
  }
  // let { screen, project } = store.state
  // const node = store.state.codeView.selectedNode
  // const grid = new contrib.grid({ rows: 12, cols: 12, screen: screen })

  const bar = optionsForm( store)

  const tree = grid.set(0, 0, 7 - offset, 6, contrib.tree, {
    template: { lines: true },
    label: node.getSourceFile().getBaseName()
  } as contrib.Widgets.TreeOptions<TreeNode>)
  tree.rows.style = { ...(tree.rows.style || {}), ...focusStyle }
  const rootNode = { extended: true, ...buildTreeNode(node.getSourceFile()) }
  tree.setData(rootNode)
 

  // const { table, actions } = buildDetails(grid, screen, 6, 0, 12 - offset, 6)

  const editor: blessed.Widgets.ScrollableTextElement = grid.set(0, 6, 12 - offset, 6, blessed.scrollabletext, {
    ...scrollableOptions,
    // alwaysScroll: true,
    // scrollable: true,
    // clickable: true,
    // focusable: true,
    // mouse: true,
    // scrollbar: {
    //   style: {
    //     inverse: true
    //   }
    // }
  } as blessed.Widgets.ScrollableTextOptions)
  editor.on('click', function(data: any) {
    showInModal(screen, JSON.stringify(data) + '  ' + JSON.stringify(editor.position))
  })

  installExitKeys(screen)
  installFocusHandler('codeAst', [tree, editor, bar,], screen, undefined, true, true)

  screen.render()


  store.addActionListener({
    listenerType: ActionListenerType.afterWrite,
    actionType: ActionType.NODE_SELECTION,
    id:ACTION_LISTENER.updateCodeViewOnNodeSelection,
    handle(a, s){
      if(isNode(a.node)){
        let text = node.getSourceFile().getFullText()
        text =
          text.substring(0, a.node.getFullStart()) +
          ansi.format(text.substring(a.node.getFullStart(), a.node.getEnd()), ['blue']) +
          text.substring(a.node.getEnd())
        if (a.node.getStartLineNumber() !== undefined) {
          editor.setScroll(Math.max(0, a.node.getStartLineNumber()) - offset)
        }
        editor.setContent(text)
        // screen.render()
      }
      
  // function selectTreeNode(n: TreeNode) {
   
    // lastSelectedNode = n
  }
  })

  tree.on('select', n=>{
    store.dispatch({
      type: ActionType.NODE_SELECTION,
      node: n.astNode
    })
    // selectTreeNode(n)
  })
  onTreeNodeFocus(tree, n=>{
    store.dispatch({
      type: ActionType.NODE_SELECTION,
      node: n.astNode
    })
  })
  // function selectTreeNode(n: TreeNode) {
  //   let text = node.getSourceFile().getFullText()
  //   text =
  //     text.substring(0, n.astNode.getFullStart()) +
  //     ansi.format(text.substring(n.astNode.getFullStart(), n.astNode.getEnd()), ['blue']) +
  //     text.substring(n.astNode.getEnd())
  //   if (n.astNode.getStartLineNumber() !== undefined) {
  //     editor.setScroll(Math.max(0, n.astNode.getStartLineNumber()) - offset)
  //   }
  //   editor.setContent(text)
  //   screen.render()
  //   // lastSelectedNode = n
  // }
}

interface TreeNode extends contrib.Widgets.TreeElementNode {
  astNode: Node
}

// interface Options {
//   project: Project
//   screen: blessed.Widgets.Screen
//   node: Node
// }
