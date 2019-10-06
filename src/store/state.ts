// HEADS UP: this is very quick / dirty. We use same REDUX names but this is almost the contrary and doesn't follow best practices.. dont try it at home!. Dont lear from this

// is modeled the state will be modeled with a general event emitter - no more redux for this time

import { contrib, Screen } from 'accursed'
import { Project } from 'ts-morph'
import { GeneralNode } from 'ts-simple-ast-extra'

/**
 * the state is mutable and not serializable (to follow best practices :)
 */
export interface State {
  project: Project
  // selectedSourceFile?: SourceFile
  offset?: number
  screen: Screen
  currentView?: ViewType
  fileView: View
  codeView: View
}

type ViewType = 'file' | 'code'

export interface View {
  /**
   * a number that depends on the height of the terminal - changes the grid to accommodate small children
   */
  verticalOffset: number
  selectedNode?: GeneralNode
  grid: contrib.Widgets.GridElement
  name: ViewType
}

export function getCurrentView(state: State) {
  return state.currentView === 'code' ? state.codeView : state.fileView
}
