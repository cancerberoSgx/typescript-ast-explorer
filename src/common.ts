const ansi = require('ansi-escape-sequences')
import { GeneralNode, getGeneralNodeChildren, isDirectory } from 'ts-simple-ast-extra'
import { getGeneralNodeKindName, getGeneralNodeName } from './project'

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
