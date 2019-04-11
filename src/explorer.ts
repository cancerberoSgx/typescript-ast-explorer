import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'
import { pwd } from 'shelljs'
import { Node, Project } from 'ts-morph'
import { GeneralNode, isNode } from 'ts-simple-ast-extra'
import { optionsForm } from './options/options'
import {
  installExitKeys,
  installFocusHandler,
  isBlessedElement,
  onTreeNodeFocus,
  visitDescendantElements
} from './util/blessed'
import { buildTreeNode, buttonStyle, focusStyle, scrollableOptions } from './util/common'
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

  const { table, value, actions } = buildDetails(grid, screen, offset, () => {
    if (lastTableData && lastSelectedNode) {
      ;(lastTableData.find(d => d[0] === 'Text') || ['', ''])[1] = lastSelectedNode.getFullText()
    }
    return lastTableData
  })

  installExitKeys(screen)

  installFocusHandler([tree, table, value, actions, optionsListBar], screen)

  screen.render()

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

function buildDetails(
  grid: contrib.grid,
  screen: blessed.Widgets.Screen,
  offset: number,
  getLastTableData: () => string[][] | undefined
) {
  const box: blessed.Widgets.BoxElement = grid.set(0, 6, 12 - offset, 6, blessed.box, {
    height: '100%',
    width: '100%',
    label: 'Details',
    keys: true,
    mouse: true,
    clickable: true
  } as blessed.Widgets.BoxOptions)

  const table = contrib.table({
    // ...scrollableOptions,// HEADS UP : THis break its
    clickable: true,
    keys: true,
    // focusable: true,
    mouse: true,

    height: '33%',
    top: '0%',
    padding: 1,
    border: 'line',
    columnWidth: [8, 200],
    label: 'Node',
    data: { headers: ['Property', 'Value'], data: [[]] },
    style: {
      border: {
        style: 'line',
        fg: 'white'
      }
    }
  } as contrib.Widgets.TableOptions)

  box.append(table)
  ;[table.rows, ...table.rows.children].filter(isBlessedElement).forEach(c =>
    c.key('enter', () => {
      if (table.rows.selected) {
        const data = getLastTableData()
        const selected = data && data[table.rows.selected]
        if (selected && selected[1]) {
          value.setContent(selected[1])
          screen.render()
        }
      }
    })
  )

  const value = blessed.scrollabletext({
    ...scrollableOptions,
    label: 'Value',
    width: '100%',
    top: '33%',
    height: '33%',
    padding: 1,
    border: 'line',
    style: {
      border: {
        style: 'line',
        fg: 'white'
      }
    }
  })
  box.prepend(value)

  const actions = blessed.box({
    // ...scrollableOptions,
    label: 'Actions',
    width: '100%',
    top: '66%',
    padding: 1,
    height: '33%',
    border: 'line',
    style: {
      border: {
        style: 'line',
        fg: 'white'
      }
    }
  })

  box.prepend(actions)

  const b1 = blessed.button({
    padding: { top: 1 },
    content: 'action 1',
    style: buttonStyle
  })
  actions.append(b1)

  return { box, table, actions, value }
}
