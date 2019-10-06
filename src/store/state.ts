import { contrib, Screen } from 'accursed'
import { Project } from 'ts-morph'
import { GeneralNode } from 'ts-simple-ast-extra'

/**
 * the state is mutable and not serializable (to follow best practices :)
 */
export interface State {
  project: Project
  offset?: number
  screen: Screen
  currentView?: ViewType
  fileView: View
  codeView: View
}

export type ViewType = 'file' | 'code'

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
