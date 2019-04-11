import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'
import { pwd } from 'shelljs'
import { Node, Project } from 'ts-morph'
import { GeneralNode, isNode } from 'ts-simple-ast-extra'
import { buildDetails } from './explorerDetails'
import { optionsForm } from './options/options'
import { installExitKeys, onTreeNodeFocus, visitDescendantElements } from './util/blessed'
import { buildTreeNode, focusStyle } from './util/common'
import { installFocusHandler } from './util/focus'
import { getGeneralNodeKindName, getGeneralNodeName, getGeneralNodePath } from './util/project'

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
  const optionsListBar = optionsForm(grid, screen, project, offset, () => lastSelectedNode)

  const tree = grid.set(0, 0, 12 - offset, 6, contrib.tree, {
    template: { lines: true },
    label: 'Files and Nodes Tree'
  } as contrib.Widgets.TreeOptions<TreeNode>)
  tree.rows.style = { ...(tree.rows.style || {}), ...focusStyle }
  const rootNode = { extended: true, ...buildTreeNode(project.getRootDirectories()[0]) }
  ;(tree as any).setData(rootNode)
  updateTreeNodeStyles(tree)
  tree.on('select', function(n: TreeNode) {
    updateTreeNodeStyles(tree)
    selectTreeNode(n)
  })
  const { table, value, actions } = buildDetails(grid, screen, offset, () => {
    if (lastTableData && lastSelectedNode) {
      ;(lastTableData.find(d => d[0] === 'Text') || ['', ''])[1] = lastSelectedNode.getFullText()
    }
    return lastTableData
  })

  screen.render()
  installExitKeys(screen)

  installFocusHandler('fileExplorer', [tree, table, value, actions, optionsListBar], screen, undefined, true, true)
  onTreeNodeFocus(tree, selectTreeNode)

  let lastTableData: string[][] | undefined

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
        [
          'Text',
          isNode(n.astNode)
            ? n.astNode
                .getFullText()
                .substring(0, Math.max(n.astNode.getFullText().length, 200))
                .replace(/\n/gm, '\\n') || ''
            : ''
        ]
      ]
      table.setData({ headers: ['Property', 'Value'], data })
      // HEADS UP : saving the data since crappy contrib table is not storing it on setData() - just format it and loose the  parsed info
      lastTableData = data
    }
    screen.render()
  }
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
