import { GeneralNode } from 'ts-simple-ast-extra'
import { ActionListener, ActionListenerType, ActionType, ACTION_LISTENER } from './actions'

export interface NodeSelectionAction {
  type: ActionType.NODE_SELECTION
  node: GeneralNode
}

export const nodeSelectionDispatcher: ActionListener<ActionType.NODE_SELECTION> = {
  listenerType: ActionListenerType.afterWrite,
  id: ACTION_LISTENER.reduceNodeSelection,
  actionType: ActionType.NODE_SELECTION,
  handle(a, s) {
    s.fileView.selectedNode = a.node
    s.codeView.selectedNode = a.node
  }
}
