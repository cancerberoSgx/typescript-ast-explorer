const ansi = require('ansi-escape-sequences')
import { Style, TextareaOptions } from 'accursed'
import { GeneralNode, getGeneralNodeChildren, getGeneralNodeKindName, getGeneralNodeName, isDirectory } from 'ts-simple-ast-extra'


export function buildTreeNode(n: GeneralNode) {
  const children: any = {}
  let counter = 0
  getGeneralNodeChildren(n).forEach(c => {
    const name =
      getGeneralNodeKindName(c) +
      (getGeneralNodeName(c)
        ? ` (${ansi.format(getGeneralNodeName(c), ['red', 'underline']) + (isDirectory(c) ? '/' : '')})`
        : '')
    children[children[name] ? name + ` (${counter++})` : name] = buildTreeNode(c)
  })
  return {
    children,
    astNode: n
  }
}

export const focusStyle: Style = {
  border: {
    type: 'line',
    fg: 'red'
  }
}
export const activeStyle: () => Style = () => ({
  bg: 'magenta',
  fg: 'black',
  underline: true
})
export const inactiveStyle: () => Style = () => ({
  bg: '#507468',
  fg: 'black',
  underline: false
})

export const focusableOpts: () => TextareaOptions = () => ({
  // mouse: true,
  // keys: true,
  // focusable: true,
  // clickable: true,
  // keyable: true,
  // border: 'line',
  // border: undefined,
  // padding: 0,
  // style: {
  //   ...inactiveStyle(),
  //   border: {
  //     type: 'line',
  //     fg: 'cyan'
  //   },
  //   // border: undefined,
  //   focus: {
  //     fg: 'black',
  //     bg: 'lightgray',
  //     border: {
  //       fg: 'red'
  //     }
  //   },
  //   item: {
  //     bg: 'lightgray',
  //     fg: 'black',
  //     underline: false
  //   },
  //   selected: activeStyle()
  // }
})
export const focusableBorderedOpts: () => TextareaOptions = () => ({
  ...focusableOpts(),
  // border: 'line',
  // style: {
  //   ...focusableOpts().style,
  //   border: {
  //     type: 'line',
  //     fg: 'cyan'
  //   },
  //   focus: {
  //     fg: 'black',
  //     bg: 'lightgray',
  //     border: {
  //       fg: 'red'
  //     }
  //   }
  // }
})


// export function focusedOptions(){
//   return {
//     style: {
//       focus: {
//     border: {
//       type: 'line',
//       fg: 'red'
//     },
//     },
//     border: {
//       type: 'line',
//       fg: 'white'
//     }
//     },
//   // keys: true,
//   clickable: true,
//   mouse: true,
//   focusable: true,

//   }
// }
export const scrollableOptions = () => ({
  scrollable: true,
  clickable: true,
  keys: true,
  focusable: true,
  mouse: true,
  scrollbar: {
    style: {
      inverse: true
    }
  }
})

export const buttonStyle = {
  item: {
    bg: 'black',
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
}
