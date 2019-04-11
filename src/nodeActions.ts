import * as blessed from 'blessed'
import { scrollableOptions } from './util/common'
import { onFocusChange, onFocus, onBlur, installFocusHandler, uninstallFocusHandler } from './util/focus';

/** builds a panel with action buttons that apply to the current selected node */
export function buildNodeActions(screen: blessed.Widgets.Screen,box: blessed.Widgets.BoxElement) {
  // const containerContainer = blessed.box({
  //   ...scrollableOptions,
  //   parent: box,
  //   border: 'line',
  //   keyable: true,
  //   focusable: true,
  //   keys: true,
  //   // padding: 1,
  //   mouse: true,
  //   // label: 'Actions',
  //   height: '33%',
  //    width: '100%',
  //   top: '66%',
  //   // style: { // heads up : if layout child does not have border or style it throws
  //   //   bg: 'cyan',
  //   //   border: {
  //   //     fg: 'black'
  //   //   }

  //   //   // ...buttonStyle
  //   // },
  // })
  const container = blessed.box({
    ...scrollableOptions,
    parent: box,
    border: 'line',
    keyable: true,
    focusable: true,
    keys: true,
    padding: 1,
    mouse: true,
    label: 'Actions',
    height: '33%',
    width: '100%',
    top: '66%'
    // style: { // heads up : if layout child does not have border or style it throws
    // bg: 'cyan',
    // border: {
    //   fg: 'black'
    // }

    // ...buttonStyle
    // },
  })
  const layout = blessed.layout({
    parent: container,
    // ...scrollableOptions,
    // se
    layout: 'inline',
    // border: 'line',
    height: '100%',
    width: '100%'
    // top: '66%',
    // border: 'line',
    // style: {
    //   bg: 'red',
    //   border: {
    //     fg: 'blue'
    //   }
    // },
  })
  
  
  onFocus(container, screen,(actual, previous)=>{
    // console.log('FOCUSSS');
    installFocusHandler('nodeActions', [b1, b2, b3], screen, ['right', 'left'], true, false)
  })
  onBlur(container, screen,(actual, previous)=>{
    // console.log('BLURRRRR');
    uninstallFocusHandler('nodeActions')
  })

  const b1 = blessed.button({
    parent: layout,
    ...scrollableOptions,
    padding: 1,
    keyable: true,
    keys: true,
    mouse: true,
    // shrink: true,
    // height: 1,
    style: {
      // heads up : if layout child does not have border or style it throws
      // bg: 'cyan',
      border: {
        // fg: 'black'
      }

      // ...buttonStyle
    },
    valign: 'middle',
    align: 'center',
    height: '50%',
    width: '40%',
    // padding: {
    //   left: 1,
    //   right: 1
    // },
    // left: 10,
    // top: 2,
    border: 'line',
    content: 'action 1'
    // style: buttonStyle
  })
  // actions.prepend(b1);
  // actions.addItem('action 1')
  const b2 = blessed.button({
    ...scrollableOptions,
    parent: layout,
    // height: 1,
    padding: 1,
    // keyable: true,
    // keys: true,
    // mouse: true,
    style: {
      // heads up : if layout child does not have border or style it throws
      // bg: 'cyan',
      // ...buttonStyle
      border: {
        // fg: 'black'
      }
    },
    // shrink: true,
    // padding: {
    //   left: 1,
    //   right: 1
    // },
    // left: 10,
    // top: 2,
    valign: 'middle',
    align: 'center',
    width: '40%',
    height: '50%',
    border: 'line',
    content: 'action 2'
    // style: buttonStyle
  })
  // actions.prepend(b2);
  // actions.a('action 2')

  const b3 = blessed.button({
    ...scrollableOptions,
    parent: layout,
    padding: 1,
    keyable: true,
    keys: true,
    mouse: true,
    style: {
      // heads up : if layout child does not have border or style it throws
      // bg: 'cyan',
      border: {
        // fg: 'black'
      }

      // ...buttonStyle
    },
    valign: 'middle',
    align: 'center',
    width: '40%',
    height: '50%',
    border: 'line',
    // shrink: true,
    // padding: {
    //   left: 1,
    //   right: 1
    // },
    // left: 10,
    // top: 2,
    content: 'action 3'
    // style: buttonStyle
  })
  // actions.prepend(b3);
  // actions.addItem('action 3')

  // const buttons = [b1, b2, b3];
  // let focused = 0;
  // actions.key(['up', 'down'], (ch, k) => {
  //   focused =
  //     k.name === 'up'
  //       ? focused >= buttons.length - 1
  //         ? 0
  //         : focused + 1
  //       : focused <= 0
  //         ? buttons.length - 1
  //         : focused - 1;
  // });
  // buttons.forEach(b => {
  //   b.style = {};
  // });
  // buttons[focused].style.border = { fg: 'pink' };
  // buttons[focused].focus();
  installFocusHandler('nodeActions', [b1, b2, b3], screen, ['right', 'left'])




  return container
}
