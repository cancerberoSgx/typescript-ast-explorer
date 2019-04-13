import * as blessed from 'blessed'
import { enumKeys, TODO } from 'misc-utils-of-mine-typescript'
import {
  BoxOptions,
  ButtonOptions,
  Element,
  IKeyEventArg,
  IMouseEventArg,
  InputOptions,
  isElement,
  LayoutOptions,
  NodeGenericEventType,
  NodeMouseEventType,
  NodeWithEvents,
  TextareaOptions
} from './blessedTypes'

type On<T> =
  | Parameters<(event: NodeMouseEventType, callback: (arg: IMouseEventArg) => void) => T>
  | Parameters<(event: 'keypress', callback: (ch: string, key: IKeyEventArg) => void) => T>
  | Parameters<(event: string, listener: (...args: any[]) => void) => T>
  | Parameters<(event: 'warning', callback: (text: string) => void) => T>
  | Parameters<(event: NodeGenericEventType, callback: () => void) => T>

enum EventOptionNames {
  key = 'key',
  onceKey = 'onceKey',
  on = 'on',
  once = 'once'
}

enum ArtificialEventOptionNames {
  onClick = 'onClick'
}

interface EventOptions {
  [EventOptionNames.key]?: Parameters<NodeWithEvents['key']>
  [EventOptionNames.onceKey]?: Parameters<NodeWithEvents['onceKey']>
  [EventOptionNames.on]?: On<this>
  [EventOptionNames.once]?: On<this>
  [ArtificialEventOptionNames.onClick]?: (e: IMouseEventArg) => void
}

declare global {
  export namespace JSX {
    export interface IntrinsicElements {
      box: BoxOptions & EventOptions
      layout: LayoutOptions & EventOptions
      text: TextareaOptions & EventOptions
      textarea: TextareaOptions & EventOptions
      button: ButtonOptions & EventOptions
      input: InputOptions & EventOptions
    }
  }
}

interface BlessedElement {
  type: keyof JSX.IntrinsicElements
  attrs?: { [a: string]: any }
  children: (BlessedElement | string | number | boolean)[]
}

type TagFn = TODO
type TagClass = TODO

export const React: {
  createElement: (
    tag: undefined | string | TagFn | TagClass,
    attrs?: undefined | { [a: string]: any },
    ...children: any[]
  ) => Element
  render: (e: BlessedElement) => Element
} = {
  createElement(tag, attrs, ...children) {
    const fn = (blessed as any)[tag] as (options?: any) => Element
    if (!fn) {
      console.log(tag, fn)
      throw new Error('blessed creator function for ' + tag + ' not found')
    }
    attrs = attrs || {}
    const eventOptionNames = enumKeys(EventOptionNames)
    const artificialEventOptionNames = enumKeys(ArtificialEventOptionNames)
    const genericEventAttributes: any = {}
    const artificialEventAttributes: any = {}

    Object.keys(attrs).forEach(a => {
      const value = attrs![a]
      if (eventOptionNames.includes(a)) {
        genericEventAttributes[a] = value
        delete attrs![a]
      }
      if (artificialEventOptionNames.includes(a)) {
        artificialEventAttributes[a] = value
        delete attrs![a]
      }
    })
    const el = fn(attrs) as Element
    children.forEach(c => {
      if (isElement(c)) {
        el.append(c)
      } else {
        //TODO text : use content or text ?
      }
    })
    return el
  },

  render(e: BlessedElement) {
    return this.createElement(e.type, e.attrs, e.children)
  }
}
