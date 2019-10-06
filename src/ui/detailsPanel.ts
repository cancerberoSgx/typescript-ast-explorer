// import {blessed} from 'accursed'
import {blessed} from 'accursed'
import * as contrib from 'blessed-contrib'
import { pwd } from 'shelljs'
import { isNode } from 'ts-simple-ast-extra'
import { ActionType, ACTION_LISTENER } from '../store/actions'
import { getCurrentView } from '../store/state'
import { ActionListenerType, Store } from '../store/store'
import { scrollableOptions } from '../util/common'
import { getGeneralNodeKindName, getGeneralNodeName, getGeneralNodePath } from '../util/project'
import { buildNodeActions } from './nodeActions'

export function detailsPanel(store: Store) {
  const view = getCurrentView(store.state)
  const { grid, verticalOffset: offset } = view

  // TABLE
  const gridPositino = view.name === 'file' ? [0, 6, 5, 6] : [5, 0, 4, 6]
  const table = grid.set(...gridPositino, contrib.table, {
    clickable: true,
    keys: true,
    focusable: true,
    draggable: true,
    mouse: true,
    border: 'line',
    columnWidth: [8, 30],
    label: 'Selection',
    data: { headers: ['Property', 'Value'], data: [[]] }
  })
  let value: blessed.Widgets.ScrollableTextElement | undefined

  // VALUE
  if (store.state.currentView !== 'code') {
    value = grid.set(...[3, 6, 5, 6], blessed.scrollabletext, {
      ...scrollableOptions,
      label: 'Full Value',
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
