import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'
import { Node, Project } from 'ts-morph'
import { installFocusHandler, onButtonClicked, onTreeNodeFocus, installExitKeys } from './blessed'
import { buildTreeNode } from './common'
import { buildExplorer } from './explorer'
import { showInModal } from './modal'
import { optionsForm } from './options'
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

  // const fileExplorerButton: blessed.Widgets.ButtonElement = grid.set(0, 6, offset, 3, blessed.button, {
  //   mouse: true,
  //   clickable: true,
  //   keys: true,
  //   name: 'fileExplorer',
  //   content: 'File Explorer',
  //   align: 'center',
  //   valign: 'middle',
  //   padding: 0,
  //   margin: 0
  // })
  // onButtonClicked(fileExplorerButton, () => {
  //   screen.clearRegion(0, parseInt(screen.width + ''), 0, parseInt(screen.height + ''))
  //   screen.render()
  //   screen.destroy()
  //   screen = blessed.screen({ smartCSR: true })
  //   buildExplorer({ screen, project })
  //   screen.render()
  // })

  // const optionsButton: blessed.Widgets.ButtonElement = grid.set(0, 9, offset, 3, blessed.button, {
  //   mouse: true,
  //   clickable: true,
  //   keys: true,
  //   name: 'options',
  //   content: 'Options',
  //   align: 'center',
  //   valign: 'middle',
  //   padding: 0,
  //   margin: 0
  // })
  // onButtonClicked(optionsButton, () => {
  //   showInModal(screen, optionsForm(screen))
  // })

  const bar = optionsForm(grid, screen, project)

  const tree: contrib.Widgets.TreeElement = grid.set(0, 0, 11, 6, contrib.tree, {
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

  const editor: blessed.Widgets.ScrollableTextElement = grid.set(offset, 6, 11 - offset, 6, blessed.scrollabletext, {
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
