import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'
import { pwd } from 'shelljs'
import { Node, Project } from 'ts-morph'
import { GeneralNode, isNode } from 'ts-simple-ast-extra'
import {
  installFocusHandler,
  isBlessedElement,
  onButtonClicked,
  visitDescendantElements,
  onTreeNodeFocus,
  installExitKeys
} from './blessed'
import { buildCodeAst } from './codeAst'
import { buildTreeNode, focusStyle } from './common'
import { getGeneralNodeKindName, getGeneralNodeName, getGeneralNodePath } from './project'
import { showInModal } from './modal'
import { optionsForm } from './options'

interface Options {
  project: Project
  screen: blessed.Widgets.Screen
}

export function buildExplorer(options: Options) {
  let { screen, project } = options
  const grid = new contrib.grid({ rows: 12, cols: 12, screen, top: 0, right: 0, bottom: 0, left: 0 })
  const rows = process.stdout.rows || 24
  const offset = rows < 20 ? 3 : rows < 40 ? 2 : 1

  let lastSelectedNode: Node | undefined
  const bar = optionsForm(grid, screen, project, offset, () => lastSelectedNode)

  const tree: contrib.Widgets.TreeElement = grid.set(0, 0, 12 - offset, 6, contrib.tree, {
    template: { lines: true },
    label: 'Files and Nodes Tree'
  })
  tree.rows.style = { ...(tree.rows.style || {}), ...focusStyle }
  onTreeNodeFocus(tree, selectTreeNode)
  const rootNode = { extended: true, ...buildTreeNode(project.getRootDirectories()[0]) }
  ;(tree as any).setData(rootNode)
  updateTreeNodeStyles(tree)
  tree.on('select', function(n: TreeNode) {
    updateTreeNodeStyles(tree)
    selectTreeNode(n)
  })

  const table: contrib.Widgets.TableElement = grid.set(0, 6, 12 - offset, 6, contrib.table, {
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
  installFocusHandler([tree, table, bar], screen)
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
}

interface TreeNode {
  astNode: GeneralNode
}

export function updateTreeNodeStyles(tree: contrib.Widgets.TreeElement) {
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
