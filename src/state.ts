// HEADS UP: this is very quick / dirty. We use same REDUX names but this is almost the contrary and doesn't follow best practices.. dont try it at home!. Dont lear from this
import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'

import { GeneralNode } from 'ts-simple-ast-extra';
import Project, { SourceFile, Node } from 'ts-morph';
import { listeners } from 'cluster';
import { createInitialState } from './util/common';

// the state will be modeled with a general event emitter - no more redux for this time

/**
 * the state is mutable and not serializable (to follow best practices :)
 */
export interface State {
  project: Project
  selectedSourceFile?: SourceFile
  offset?: number
  screen: blessed.Widgets.Screen,
  currentView?: ViewType
  fileView: View,
  codeView: View

}
export type ViewType = 'file'|'code'
export function getCurrentView(state:State){
  return state.currentView==='code' ? state.codeView : state.fileView
}
interface View{
  /**a number that depends on the height of the terminal - changes the grid to accommodate small children */
  verticalOffset: number
  selectedNode?: GeneralNode
  grid: contrib.Widgets.GridElement
  name: string

}
/**
 * Store is public and anyone can register as dispatcher 
 */
export interface Store {
  /** this is similar to store.dispatch in the sense that anybody from user facing dispatch simple action objects against the store hen user performs something.  */
  dispatch<T extends ActionType>(a: ActionTypeMap[T]): void
  /** half store.subscribe() and half a redux-sage. this is the dispatch order:  `[...this.listeners.beforeWrite, ...this.listeners.beforeReadOnly, ...this.listeners.afterWrite, ...this.listeners.afterReadOnly]`. listeners can listen only  to one kind of action . */
  addActionListener<T extends ActionType>(l: ActionListener<T>): void
  state: State
}

export function createStore(){
  return new StoreImpl(createInitialState())
}

class StoreImpl implements Store {
  private _state: State;
  private listeners: { [name in ActionListenerType]: ActionListener<ActionType>[] } = {
    beforeReadOnly: [],
    afterReadOnly: [],
    beforeWrite: [],
    afterWrite: []
  }
  constructor(initialState: State ) {
    this._state = initialState
  }
  addActionListener<T extends ActionType>(d: ActionListener<T>): void {
    this.listeners[d.listenerType].push(d)
  }
  dispatch<T extends ActionType>(a: ActionTypeMap[T]): void {
    [...this.listeners.beforeWrite, ...this.listeners.beforeReadOnly, ...this.listeners.afterWrite, ...this.listeners.afterReadOnly].forEach(l => {
      l.handle(a, this._state)
    })
    this.state.screen.render()
  }
  get state() {
    return this._state
  }
}
/** name convention Like redux actions they are expect to come with an event payload */
export enum ActionType {
  NODE_SELECTION = 'node:selection'
}

interface Action<T extends ActionType> {
  type: T
}
// export interface Dispatcher<T extends ActionType> extends ActionListener<T>{}

/**
 * Dispatcher is like Reducer but with more freedom - receive the action and the entire state and mutates it.
 */
export interface ActionListener<T extends ActionType> {
  listenerType: ActionListenerType
  actionType: T
  handle<T extends ActionType, A extends ActionTypeMap[T]>(action: A, state: State): void
}
interface NodeSelectionAction{
  type: ActionType.NODE_SELECTION
  node: GeneralNode
}
/** centraliced action map to typed actions */
interface ActionTypeMap {
  [ActionType.NODE_SELECTION]:NodeSelectionAction
}
export enum ActionListenerType {
  beforeReadOnly = 'beforeReadOnly',
  afterReadOnly = 'afterReadOnly',
  afterWrite = 'afterWrite',
  beforeWrite = 'beforeWrite'

}