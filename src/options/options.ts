import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'
import { Node, Project } from 'ts-morph'
import { buildCodeAst } from '../codeAst'
import { buildExplorer } from '../explorer'
import { buttonStyle, resetScreen } from '../util/common'
import { showInModal } from '../util/modal'
import { help } from './help'
import { GeneralNode, isNode } from 'ts-simple-ast-extra';
import { getCurrentView } from '../store/state';
import { Store } from '../store/store';

export function optionsForm(
  // grid: contrib.Widgets.GridElement,
  store: Store,
  // getLastSelectedNode?: () => GeneralNode | undefined
)
// : blessed.Widgets.ListbarElement 
{
  // const currentView: 'fileExplorer' | 'viewCode' = getLastSelectedNode ? 'fileExplorer' : 'viewCode'
  const view = getCurrentView(store.state)
  const { verticalOffset: offset, grid } = view
  let { screen, currentView } = store.state

  const bar = grid.set(12 - offset, 0, offset, 12, blessed.listbar, {
    height: 'shrink',
    mouse: true,
    keys: true,
    style: buttonStyle,
    commands: {
      Help: {
        keys: ['h'],
        callback() {
          const markdown = help()
          showInModal(screen, markdown)
          screen.render()
        }
      },
      [view.name]: {
        keys: ['v'],
        callback() {
          try {
            
          // const node =  getLastSelectedNode ? getLastSelectedNode() : undefined
          if (view.name === 'file' && isNode(view.selectedNode)) {
            // TODO: ACTION AND DISPATCHER for this:
resetScreen(store)
  buildCodeAst(store)
  store.state.screen.render()
          } else {
            showInModal(screen, 'You must select some SourceFile or Node to activate this view')
            // buildExplorer({ screen, project })
          }
          } catch (error) {
            console.log('ERROR', error);
            
          }

        }
      },
      'getChildren()': {
        callback() {
          screen.render()
        }
      }
    }
  })

  bar.focus()
  screen.render()
  return bar
}
