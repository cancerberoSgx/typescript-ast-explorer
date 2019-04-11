const ansi = require('ansi-escape-sequences')
import { GeneralNode, getGeneralNodeChildren, isDirectory } from 'ts-simple-ast-extra'
import * as contrib from 'blessed-contrib'
import { getGeneralNodeKindName, getGeneralNodeName } from './project'
import * as blessed from 'blessed'
import Project from 'ts-morph';
import { State, getCurrentView } from '../state';
import { getVerticalOffset as getVerticalOffsetFile} from '../explorer';
import { getVerticalOffset as getVerticalOffsetCode} from '../codeAst';




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

export const focusStyle = {
  border: {
    type: 'line',
    fg: 'red'
  }
}

export const scrollableOptions = {
  // alwaysScroll: true,
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
}

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


export function createInitialState(): State {
  var screen = blessed.screen({
    smartCSR: true
  })
  const project = new Project({ tsConfigFilePath: './tsconfig.json', addFilesFromTsConfig: true })
  return {
    project, screen,
    fileView: {
      verticalOffset: getVerticalOffsetFile(),
      name: 'Code Explorer',
      grid: new contrib.grid({ rows: 12, cols: 12, screen, top: 0, right: 0, bottom: 0, left: 0 })
    },
    codeView: {
      verticalOffset: getVerticalOffsetCode(),
      name: 'File Explorer',
      grid: new contrib.grid({ rows: 12, cols: 12, screen: screen })
    }
  }
}