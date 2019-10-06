import { blessed, showInModal } from 'accursed'
import { isNode } from 'ts-simple-ast-extra'
import { ActionType, ACTION_LISTENER } from '../store/actions'
import { ActionListenerType, Store } from '../store/store'
import { focusableBorderedOpts, scrollableOptions } from '../util/common'
const ansi = require('ansi-escape-sequences')

export function createCodeView(store: Store) {
  const { screen, project } = store.state
  const { grid, verticalOffset: offset, selectedNode: node } = store.state.view
  const editor: blessed.Widgets.ScrollableTextElement = grid.set(0, 6, 12 - offset - 3, 6, blessed.scrollabletext, {
    ...focusableBorderedOpts(),
    ...scrollableOptions()
  } as blessed.Widgets.ScrollableTextOptions)
  editor.on('click', function(data: any) {
    showInModal(screen, JSON.stringify(data) + '  ' + JSON.stringify(editor.position))
  })
  store.addActionListener({
    listenerType: ActionListenerType.afterWrite,
    actionType: ActionType.NODE_SELECTION,
    id: ACTION_LISTENER.updateCodeViewOnNodeSelection,
    handle(a, s) {
      if (isNode(a.node)) {
        let text = a.node.getSourceFile().getFullText()
        text =
          text.substring(0, a.node.getFullStart()) +
          ansi.format(text.substring(a.node.getFullStart(), a.node.getEnd()), ['blue']) +
          text.substring(a.node.getEnd())
        if (a.node.getStartLineNumber() !== undefined) {
          editor.setScroll(Math.max(0, a.node.getStartLineNumber()) - offset)
        }
        editor.setContent(text)
      }
    }
  })
  return editor
}
