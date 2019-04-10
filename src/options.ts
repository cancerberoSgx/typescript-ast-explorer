import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'
import { buildExplorer } from './explorer'
import { Project } from 'ts-morph'
import { showInModal } from './modal'
import { help } from './help'

export function optionsForm(
  grid: contrib.Widgets.GridElement,
  screen: blessed.Widgets.Screen,
  project: Project
): blessed.Widgets.ListbarElement {
  // var form = blessed.form({
  //   keys: true,
  //   content: 'Options'
  // });
  // var childrenMode = blessed.checkbox({
  //   parent: form,
  //   mouse: true,
  //   keys: true,
  //   hoverText: 'Obtain Node children using \ngetChildren() or forEachChild() method',
  //   checked: false,
  //   content: 'Use getChildren?',
  // });
  // var submit = blessed.button({
  //   parent: form,
  //   mouse: true,
  //   keys: true,
  //   content: 'submit',
  // });
  // var cancel = blessed.button({
  //   parent: form,
  //   mouse: true,
  //   keys: true,
  //   content: 'cancel',
  // });
  // return form;

  // var auto = false;

  // let screen = blessed.screen({
  //   // dump: __dirname + '/logs/listbar.log',
  //   autoPadding: auto,
  //   // warnings: true
  // });

  // const screen = grid.screen

  // var box = blessed.box({
  //   parent: screen,
  //   top: 0,
  //   right: 0,
  //   width: 'shrink',
  //   height: 'shrink',
  //   content: '...'
  // });

  const bar: blessed.Widgets.ListbarElement = grid.set(11, 0, 1, 12, blessed.listbar, {
    //parent: screen,
    // bottom: 0,
    // left: 3,
    // right: 3,
    height: 'shrink', //auto ? 'shrink' : 3,
    mouse: true,
    keys: true,
    // autoCommandKeys: true,
    // border: 'line',
    // vi: true,
    style: {
      // bg: 'green',
      item: {
        bg: 'red',
        hover: {
          bg: 'blue'
        },
        focus: {
          bg: 'blue'
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
      'File Explorer': {
        keys: ['f'],
        callback() {
          screen.clearRegion(0, parseInt(screen.width + ''), 0, parseInt(screen.height + ''))
          screen.render()
          screen.destroy()
          screen = blessed.screen({ smartCSR: true })
          buildExplorer({ screen, project })
          screen.render()
        }
      },
      'getChildren()': {
        callback() {
          // box.setContent('getChildren()');
          screen.render()
        }
      }
    } as any,
    items: {
      'File Explorer': {
        thirteen: function() {
          // box.setContent('Pressed thirteen.');
          screen.render()
        },
        fourteen: function() {
          // box.setContent('Pressed fourteen.');
          screen.render()
        }
      }
    }
  } as any)

  bar.focus()
  screen.render()
  return bar
}
