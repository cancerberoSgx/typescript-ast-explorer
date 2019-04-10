import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'
import { pwd } from 'shelljs'
import { Node, Project } from 'ts-morph'
import { GeneralNode, isNode } from 'ts-simple-ast-extra'
import {
  installExitKeys,
  installFocusHandler,
  isBlessedElement,
  showInModal,
  onButtonClicked,
  onTreeNodeFocus,
  visitDescendantElements
} from './blessed'
import { buildCodeAst } from './codeAst'
import { buildTreeNode, focusStyle } from './common'
import { getGeneralNodeKindName, getGeneralNodeName, getGeneralNodePath } from './project'

interface Options {
  project: Project
  screen: blessed.Widgets.Screen
}

export function buildExplorer(options: Options) {
  let { screen, project } = options
  const grid = new contrib.grid({ rows: 12, cols: 12, screen, top: 0, right: 0, bottom: 0, left: 0})
  const rows = process.stdout.rows || 24
  const offset = rows< 20 ? 3 : rows< 40 ? 2 : 1

  const viewCodeButton: blessed.Widgets.ButtonElement = grid.set(0, 6, offset, 3, blessed.button, {
    mouse: true,
    clickable: true,
    keys: true,
    content: 'View Code',
    align: 'center',
    valign: 'middle'
  })
  onButtonClicked(viewCodeButton, () => {
    if (lastSelectedNode) {
      screen.clearRegion(0, parseInt(screen.width + ''), 0, parseInt(screen.height + ''))
      screen.render()
      screen.destroy()
      screen = blessed.screen({ smartCSR: true })
      buildCodeAst({ screen, node: lastSelectedNode, project })
      screen.render()
    }
  })

  const optionsButton: blessed.Widgets.ButtonElement = grid.set(0, 9, offset, 3, blessed.button, {
    mouse: true,
    clickable: true,
    keys: true,
    hoverText: 'Options',
    content: 'Options',
    align: 'center',
    valign: 'middle' 
  } as blessed.Widgets.ButtonOptions)
  onButtonClicked(optionsButton, () => {
    showInModal(screen, 'hello')
  })

  const tree: contrib.Widgets.TreeElement = grid.set(0, 0, 12, 6, contrib.tree, {
    template: { lines: true },
    label: 'Files and Nodes Tree'
  })
  tree.rows.style = { ...(tree.rows.style || {}), ...focusStyle }
  onTreeNodeFocus(tree, selectTreeNode)
  const rootNode = { extended: true, ...buildTreeNode(project.getRootDirectories()[0]) }
  // @ts-ignore
  tree.setData(rootNode)
  updateTreeNodeStyles(tree)
  tree.on('select', function(n: TreeNode) {
    selectTreeNode(n)
  })
  updateTreeNodeStyles(tree)

  const table: contrib.Widgets.TableElement = grid.set(offset, 6, 12 - offset, 6, contrib.table, {
    keys: true,
    label: 'Details',
    columnWidth: [8, 200],
    style: {
      fg: 'green'
    }
  })
  table.children.filter(isBlessedElement).forEach(c =>
    c.key('enter', function(ch, key) {
      console.log(table.children.filter(isBlessedElement).map(c => c.getText()))
    })
  )
  table.setData({ headers: ['Property', 'Value'], data: [[]] })

  installExitKeys(screen)
  installFocusHandler([tree, table, viewCodeButton, optionsButton], screen)
  screen.render()

  function selectTreeNode(n: TreeNode) {
    if (n.astNode) {
      if (isNode(n.astNode)) {
        lastSelectedNode = n.astNode
      }
      const data = [
        ['Kind', getGeneralNodeKindName(n.astNode) || ''],
        ['Name', getGeneralNodeName(n.astNode) || ''],
        ['Position', isNode(n.astNode) ? n.astNode.getPos() + '' : ''],
        ['Path', getGeneralNodePath(n.astNode, pwd()) || ''],
        ['Text', isNode(n.astNode) ? n.astNode.getText().replace(/\n/gm, '\\n') || '' : '']
      ]
      table.setData({ headers: ['Property', 'Value'], data })
    }
    screen.render()
  }
  let lastSelectedNode: Node | undefined
}

interface TreeNode {
  astNode: GeneralNode
}

export function updateTreeNodeStyles(tree: contrib.Widgets.TreeElement) {
  visitDescendantElements(tree, e => {
    const content = e.getContent()
    if (content.includes('/ [') || content.trim().endsWith('/') || content.includes('.')) {
      e.style.fg = 'yellow'
    } else {
      e.style.fg = 'white'
    }
    return false
  })
}
