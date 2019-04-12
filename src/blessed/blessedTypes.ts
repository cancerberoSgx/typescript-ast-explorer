import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'

export type Node = blessed.Widgets.Node
export type Box = blessed.Widgets.BoxElement
export type Element = blessed.Widgets.BlessedElement
export type ElementOptions = blessed.Widgets.ElementOptions
export type BoxOptions = blessed.Widgets.BoxOptions
export type LayoutIterator = blessed.Widgets.LayoutIterator

export type LayoutElement = blessed.Widgets.LayoutElement

export type CheckboxElement = blessed.Widgets.CheckboxElement
export type PositionCoords = blessed.Widgets.PositionCoords
export type Screen = blessed.Widgets.Screen
export type IMouseEventArg = blessed.Widgets.Events.IMouseEventArg
export type Markdown = contrib.Widgets.MarkdownElement

export function isScreen(n: any): n is Screen {
  return n && n.type === 'screen' && n.restoreFocus
}
export function isElement(n: any): n is Element {
  return n && n.removeLabel && n.disableDrag && n.setContent && n.getScreenLines
}
