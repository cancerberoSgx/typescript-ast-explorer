import { State } from './state';
import { NodeSelectionAction } from "./nodeSelection";
let actions;
/** name convention Like redux actions they are expect to come with an event payload */
export enum ActionType {
  NODE_SELECTION = 'node:selection'
}
// interface Action<T extends ActionType> {
//   type: T
// }
// export interface Dispatcher<T extends ActionType> extends ActionListener<T>{}
/**
 * Dispatcher is like Reducer but with more freedom - receive the action and the entire state and mutates it.
 */
export interface ActionListener<T extends ActionType> {
  /**
   * Since in this "agile" code we could be registering listeners / reducers/sagas in the middle of UI code, we want to ensure they are unique and well identified with names form a central dictionary
   */
  id: ACTION_LISTENER
  listenerType: ActionListenerType;
  actionType: T;
  handle<T extends ActionType, A extends ActionTypeMap[T]>(action: A, state: State): void;
}
/** centraliced action map to typed actions */
export interface ActionTypeMap {
  [ActionType.NODE_SELECTION]: NodeSelectionAction;
}
export enum ActionListenerType {
  beforeReadOnly = 'beforeReadOnly',
  afterReadOnly = 'afterReadOnly',
  afterWrite = 'afterWrite',
  beforeWrite = 'beforeWrite'
}
export enum ACTION_LISTENER {
  /** will just change the state after node selection */
  reduceNodeSelection = 'reduceNodeSelection',
  /** on explorerDetails UI, it will update the table and the value text when a node is selected */
  updateDetailsViewOnNodeSelection = "updateDetailsViewOnNodeSelection",
  /** updates the code view UI when a node is selected */
  updateCodeViewOnNodeSelection = "updateCodeViewOnNodeSelection"
}