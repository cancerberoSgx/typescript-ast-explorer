import { GeneralNode } from 'ts-simple-ast-extra';
import { ActionType, ActionListenerType, ActionListener, ACTION_LISTENER } from './actions';
import { getCurrentView } from './state';

export interface NodeSelectionAction {
  type: ActionType.NODE_SELECTION;
  node: GeneralNode;
}

export const nodeSelectionDispatcher: ActionListener<ActionType.NODE_SELECTION> ={
  listenerType: ActionListenerType.afterWrite,
  id: ACTION_LISTENER.reduceNodeSelection,
  actionType: ActionType.NODE_SELECTION,
  handle(a, s) {
    s.fileView.selectedNode =a.node;
    s.codeView.selectedNode = a.node;
    // getCurrentView(s).selectedNode = a.node;
  }
}
