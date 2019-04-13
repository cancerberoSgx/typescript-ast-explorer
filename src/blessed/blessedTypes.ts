import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'

export type Node = blessed.Widgets.Node
export type Box = blessed.Widgets.BoxElement

export type TextElement = blessed.Widgets.TextElement
export type Element = blessed.Widgets.BlessedElement
export type LayoutIterator = blessed.Widgets.LayoutIterator
export type Padding = blessed.Widgets.Padding
export type NodeWithEvents = blessed.Widgets.NodeWithEvents
export type Textarea = blessed.Widgets.TextareaElement
export type Button = blessed.Widgets.ButtonElement

export type Layout = blessed.Widgets.LayoutElement
export type Checkbox = blessed.Widgets.CheckboxElement
export type Screen = blessed.Widgets.Screen

export type BoxOptions = blessed.Widgets.BoxOptions
export type ElementOptions = blessed.Widgets.ElementOptions
export type LayoutOptions = blessed.Widgets.LayoutOptions
export type TextElementOptions = blessed.Widgets.TextOptions
export type TextareaOptions = blessed.Widgets.TextareaOptions
export type ButtonOptions = blessed.Widgets.ButtonOptions
export type InputOptions = blessed.Widgets.InputOptions
export type CheckboxOptions = blessed.Widgets.CheckboxOptions

export type PositionCoords = blessed.Widgets.PositionCoords

export type IMouseEventArg = blessed.Widgets.Events.IMouseEventArg
export type NodeMouseEventType = blessed.Widgets.NodeMouseEventType
export type NodeScreenEventType = blessed.Widgets.NodeScreenEventType
export type IKeyEventArg = blessed.Widgets.Events.IKeyEventArg
export type NodeEventType = blessed.Widgets.NodeEventType
export type NodeGenericEventType = blessed.Widgets.NodeGenericEventType

export type Markdown = contrib.Widgets.MarkdownElement

export function isScreen(n: any): n is Screen {
  return n && isNode(n) && n.type === 'screen'
}
export function isElement(n: any): n is Element {
  return n && n.removeLabel && n.disableDrag && n.setContent && n.getScreenLines
}

export function isNode(n: any): n is Node {
  return n && n.insertBefore && n.forDescendants
}
