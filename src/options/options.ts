import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'
import { Node, Project } from 'ts-morph'
import { buildCodeAst } from '../codeAst'
import { buildExplorer } from '../explorer'
import { showInModal } from '../modal'
import { help } from './help'

export function optionsForm(
  grid: contrib.Widgets.GridElement,
  screen: blessed.Widgets.Screen,
  project: Project,
  offset = 1,
  getLastSelectedNode?: () => Node | undefined
): blessed.Widgets.ListbarElement {
  const currentView: 'fileExplorer' | 'viewCode' = getLastSelectedNode ? 'fileExplorer' : 'viewCode'
  const bar: blessed.Widgets.ListbarElement = grid.set(12 - offset, 0, offset, 12, blessed.listbar, {
    height: 'shrink',
    mouse: true,
    keys: true,
    style: {
      item: {
        bg: 'gray',
        hover: {
          bg: 'yellow'
        },
        focus: {
          bg: 'cyan'
        }
      },
      selected: {
        bg: 'blue'
      }
    } as any,
    commands: {
      Help: {
        keys: ['h'],
        callback() {
          const markdown = help()
          showInModal(screen, markdown)
          screen.render()
        }
      },
      [currentView === 'fileExplorer' ? 'View Code' : 'File Explorer']: {
        keys: ['v'],
        callback() {
          screen.clearRegion(0, parseInt(screen.width + ''), 0, parseInt(screen.height + ''))
          screen.render()
          screen.destroy()
          screen = blessed.screen({ smartCSR: true })
          if (currentView === 'fileExplorer') {
            buildCodeAst({ screen, project, node: getLastSelectedNode!()! })
          } else {
            buildExplorer({ screen, project })
          }
          screen.render()
        }
      },
      'getChildren()': {
        callback() {
          screen.render()
        }
      }
    } as any,
    items: {
      'File Explorer': {
        thirteen: function() {
          screen.render()
        },
        fourteen: function() {
          screen.render()
        }
      }
    }
  } as any)

  bar.focus()
  screen.render()
  return bar
}
