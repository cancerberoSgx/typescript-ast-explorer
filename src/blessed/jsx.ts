import * as blessed from 'blessed'
import { enumKeys, TODO } from 'misc-utils-of-mine-typescript'
import {
  Box,
  BoxOptions,
  Button,
  ButtonOptions,
  Element,
  IKeyEventArg,
  IMouseEventArg,
  isElement,
  Layout,
  LayoutOptions,
  NodeGenericEventType,
  NodeMouseEventType,
  NodeWithEvents,
  Textarea,
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

// type ArtificialEventAttributeData=
type ArtificialEventAttributes = {
  [a in ArtificialEventOptionNames]: {
    methodName: EventOptionNames
    eventType: NodeMouseEventType | NodeGenericEventType | 'keypress' | 'warning'
  }
}
const artificialAttributesToMethodName: ArtificialEventAttributes = {
  [ArtificialEventOptionNames.onClick]: { methodName: EventOptionNames.on, eventType: 'click' }
}

interface ArtificialEvent<T extends Element> {
  currentTarget: T
}

type ArtificialEventHandler<T extends Element> = (this: T, e: IMouseEventArg & ArtificialEvent<T>) => void
interface EventOptions<T extends Element> {
  [EventOptionNames.key]?: Parameters<NodeWithEvents['key']>
  [EventOptionNames.onceKey]?: Parameters<NodeWithEvents['onceKey']>
  [EventOptionNames.on]?: On<this>
  [EventOptionNames.once]?: On<this>
  [ArtificialEventOptionNames.onClick]?: ArtificialEventHandler<T>
}

declare global {
  export namespace JSX {
    export interface IntrinsicElements {
      box: BoxOptions & EventOptions<Box>
      layout: LayoutOptions & EventOptions<Layout>
      text: TextareaOptions & EventOptions<Textarea>
      textarea: TextareaOptions & EventOptions<Textarea>
      button: ButtonOptions & EventOptions<Button>
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
    const blessedEventMethodAttributes = {} as { [a in EventOptionNames]: any }
    const artificialEventAttributes = {} as { [a in ArtificialEventOptionNames]: ArtificialEventHandler<Element> }

    Object.keys(attrs).forEach(a => {
      const value = attrs![a]
      if (eventOptionNames.includes(a)) {
        blessedEventMethodAttributes[a as EventOptionNames] = value
        delete attrs![a]
      }
      if (artificialEventOptionNames.includes(a)) {
        artificialEventAttributes[a as ArtificialEventOptionNames] = value
        delete attrs![a]
      }
    })
    const el = fn(attrs) as Element
    // generic event handlers
    Object.keys(blessedEventMethodAttributes).forEach(methodName => {
      const args = blessedEventMethodAttributes[methodName as EventOptionNames] as any[]
      ;(el as any)[methodName](...args.map(a => (typeof a === 'function' ? a.bind(el) : a)))
    })
    // artificial event handlers like onClick (these doesn't exist on blessed - we need to map them manually)
    Object.keys(artificialEventAttributes).forEach(attributeName => {
      if (attributeName === ArtificialEventOptionNames.onClick) {
        const fn = artificialEventAttributes[attributeName]
        el.on('click', e => {
          fn.bind(el)({ ...e, currentTarget: el }) //, {...e, currentTarget: el})
        })
      } else {
        //TODO
      }
    })
    // append children
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
