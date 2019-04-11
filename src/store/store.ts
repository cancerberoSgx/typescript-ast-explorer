import { createInitialState } from '../util/common';
import { State } from './state';
import { ActionType, ActionTypeMap, ActionListener, ActionListenerType } from "./actions";
import { nodeSelectionDispatcher } from './nodeSelection';
/**
 * Store is public and anyone can register as dispatcher
 */
export interface Store {
  /** this is similar to store.dispatch in the sense that anybody from user facing dispatch simple action objects against the store hen user performs something.  */
  dispatch<T extends ActionType>(a: ActionTypeMap[T]): void;
  /** half store.subscribe() and half a redux-sage. this is the dispatch order:  `[...this.listeners.beforeWrite, ...this.listeners.beforeReadOnly, ...this.listeners.afterWrite, ...this.listeners.afterReadOnly]`. listeners can listen only  to one kind of action . */
  addActionListener<T extends ActionType>(l: ActionListener<T>): void;
  state: State;
}
export function createStore() {
  const allReducers = [nodeSelectionDispatcher]
  const store = new StoreImpl(createInitialState());
  allReducers.forEach(r=>{
    store.addActionListener(r)
  })
  return store
}
class StoreImpl implements Store {
  private _state: State;
  private listeners: {
    [name in ActionListenerType]: ActionListener<ActionType>[];
  } = {
      beforeReadOnly: [],
      afterReadOnly: [],
      beforeWrite: [],
      afterWrite: []
    };
  constructor(initialState: State) {
    this._state = initialState;
  }
  addActionListener<T extends ActionType>(d: ActionListener<T>): void {
    // TODO: verify non duplicates ids
    this.listeners[d.listenerType].push(d);
  }
  dispatch<T extends ActionType>(a: ActionTypeMap[T]): void {
    [...this.listeners.beforeWrite, ...this.listeners.beforeReadOnly, ...this.listeners.afterWrite, ...this.listeners.afterReadOnly].forEach(l => {
      l.handle(a, this._state);
    });
    this.state.screen.render();
  }
  get state() {
    return this._state;
  }
}
