import { GeneralNode } from 'ts-simple-ast-extra'
import { ActionListener, ActionType, ACTION_LISTENER } from './actions'
import { Action, ActionListenerType } from './store'

export interface NodeSelectionAction extends Action<ActionType.NODE_SELECTION> {
  type: ActionType.NODE_SELECTION
  node: GeneralNode
}

export const nodeSelectionDispatcher: ActionListener<ActionType.NODE_SELECTION> = {
  listenerType: ActionListenerType.afterWrite,
  id: ACTION_LISTENER.reduceNodeSelection,
  actionType: ActionType.NODE_SELECTION,
  handle(a, s) {
    s.view.selectedNode = a.node
  }
}
