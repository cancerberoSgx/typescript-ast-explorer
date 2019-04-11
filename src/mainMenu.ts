import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'
import { Node, Project } from 'ts-morph'
import { buildCodeAst } from './codeAst'
import { buildExplorer } from './explorer'
import { buttonStyle, resetScreen } from './util/common'
import { showInModal } from './util/modal'
import { help } from './options/help'
import { GeneralNode, isNode } from 'ts-simple-ast-extra';
import { getCurrentView } from './store/state';
import { Store } from './store/store';

export function mainMenu(
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
      [`${view.name==='file' ? 'Code' : 'File'} View`]: {
        keys: ['v'],
        callback() {
          try {
            // const node =  getLastSelectedNode ? getLastSelectedNode() : undefined
            if (view.name === 'file') {
              // TODO: ACTION AND DISPATCHER for this:
              if (isNode(view.selectedNode)) {
                resetScreen(store)
                store.state.currentView='code'
                buildCodeAst(store)
                store.state.screen.render()
              } else {
                showInModal(screen, 'You must select some SourceFile or Node to activate this view')
                // buildExplorer({ screen, project })
              }
            } else {
              // showInModal(store.state.screen, 'about to change')
              resetScreen(store)
              store.state.currentView='file'

              // showInModal(store.state.screen, 'clean')

              buildExplorer(store)
              // showInModal(store.state.screen, 'built')

              // store.state.screen
              store.state.screen.render()
            }
          } catch (error) {
            console.log('ERROR', error);
            showInModal(store.state.screen, `${error} ERROR`)
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
