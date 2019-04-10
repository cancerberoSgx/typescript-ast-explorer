import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'
import { Node, Project } from 'ts-morph'
import { installExitKeys, installFocusHandler, onTreeNodeFocus } from './blessed'
import { buildTreeNode } from './common'
import { showInModal } from './modal'
import { optionsForm } from './options/options'
const ansi = require('ansi-escape-sequences')

export function buildCodeAst(options: Options) {
  const rows = process.stdout.rows || 24
  const offset = rows < 20 ? 3 : rows < 40 ? 2 : 1

  const focusStyle = {
    border: {
      type: 'line',
      fg: 'red'
    }
  }
  let { screen, project, node } = options
  const grid = new contrib.grid({ rows: 12, cols: 12, screen: screen })

  const bar = optionsForm(grid, screen, project, offset)

  const tree: contrib.Widgets.TreeElement = grid.set(0, 0, 12 - offset, 6, contrib.tree, {
    template: { lines: true },
    label: node.getSourceFile().getBaseName()
  } as contrib.Widgets.TreeOptions)
  tree.rows.style = { ...(tree.rows.style || {}), ...focusStyle }
  onTreeNodeFocus(tree, selectTreeNode)
  const rootNodew = { extended: true, ...buildTreeNode(node.getSourceFile()) }
  ;(tree as any).setData(rootNodew)
  tree.on('select', function(n: TreeNode) {
    selectTreeNode(n)
  })

  const editor: blessed.Widgets.ScrollableTextElement = grid.set(0, 6, 12 - offset, 6, blessed.scrollabletext, {
    alwaysScroll: true,
    scrollable: true,
    clickable: true,
    focusable: true,
    mouse: true,
    scrollbar: {
      style: {
        inverse: true
      }
    }
  } as blessed.Widgets.ScrollableTextOptions)
  editor.on('click', function(data: any) {
    showInModal(screen, JSON.stringify(data) + '  ' + JSON.stringify(editor.position))
  })

  installExitKeys(screen)
  installFocusHandler([tree, editor, bar], screen)
  screen.render()

  function selectTreeNode(n: TreeNode) {
    let text = node.getSourceFile().getFullText()
    text =
      text.substring(0, n.astNode.getFullStart()) +
      ansi.format(text.substring(n.astNode.getFullStart(), n.astNode.getEnd()), ['blue']) +
      text.substring(n.astNode.getEnd())
    if (n.astNode.getStartLineNumber() !== undefined) {
      editor.setScroll(Math.max(0, n.astNode.getStartLineNumber()) - offset)
    }
    editor.setContent(text)
    screen.render()
  }
}

interface TreeNode {
  astNode: Node
}

interface Options {
  project: Project
  screen: blessed.Widgets.Screen
  node: Node
}
