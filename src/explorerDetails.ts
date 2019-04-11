import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'
import { pwd } from 'shelljs'
import { isNode } from 'ts-simple-ast-extra'
import { buildNodeActions } from './nodeActions'
import { ActionListenerType, ActionType, ACTION_LISTENER } from './store/actions'
import { getCurrentView } from './store/state'
import { Store } from './store/store'
import { scrollableOptions } from './util/common'
import { getGeneralNodeKindName, getGeneralNodeName, getGeneralNodePath } from './util/project'

export function detailsPanel(store: Store) {
  const { screen, project } = store.state
  const view = getCurrentView(store.state)
  const { grid, verticalOffset: offset } = view
  const table = grid.set(...(view.name === 'file' ? [0, 6, 12 - offset, 6] : [6, 0, 12 - offset, 6]), contrib.table, {
    clickable: true,
    keys: true,
    focusable: true,
    draggable: true,
    mouse: true,
    height: '33%',
    top: 0,
    padding: 1,
    border: 'line',
    columnWidth: [8, 30],
    label: 'Selection',
    data: { headers: ['Property', 'Value'], data: [[]] }
  })
  let value: blessed.Widgets.ScrollableTextElement | undefined

  if (store.state.currentView !== 'code') {
    value = grid.set(...[5, 6, 12 - offset, 8], blessed.scrollabletext, {
      ...scrollableOptions,
      label: 'Full Value',
      width: '100%',
      top: '33%',
      height: '33%',
      padding: 1,
      draggable: true,
      border: 'line'
    })
  }

  const actions = buildNodeActions(store)
  store.addActionListener({
    listenerType: ActionListenerType.afterWrite,
    actionType: ActionType.NODE_SELECTION,
    id: ACTION_LISTENER.updateDetailsViewOnNodeSelection,
    handle(a, s) {
      if (value) {
        value.setContent(isNode(a.node) ? a.node.getFullText() : '')
      }
      const data = [
        ['Kind', getGeneralNodeKindName(a.node) || ''],
        ['Name', getGeneralNodeName(a.node) || ''],
        ['Position', isNode(a.node) ? a.node.getPos() + '' : ''],
        ['Path', getGeneralNodePath(a.node, pwd()) || ''],
        [
          'Text',
          isNode(a.node)
            ? a.node
                .getFullText()
                .substring(0, Math.max(a.node.getFullText().length, 200))
                .replace(/\n/gm, '\\n') || ''
            : ''
        ]
      ]
      table.setData({ headers: ['Property', 'Value'], data })
    }
  })

  return { table, actions, value }
}
