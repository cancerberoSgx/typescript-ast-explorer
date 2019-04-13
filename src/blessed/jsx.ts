import * as blessed from 'blessed'
import { enumKeys, TODO } from 'misc-utils-of-mine-typescript'
import {
  BigText,
  BigTextOptions,
  Box,
  BoxOptions,
  Button,
  ButtonOptions,
  Checkbox,
  CheckboxOptions,
  Element,
  FileManager,
  FileManagerOptions,
  Form,
  FormOptions,
  IKeyEventArg,
  IMouseEventArg,
  INodeGenericEventArg,
  isNode,
  Layout,
  LayoutOptions,
  Line,
  LineOptions,
  List,
  ListBar,
  ListbarOptions,
  ListOptions,
  ListTable,
  ListTableOptions,
  Node,
  NodeGenericEventType,
  NodeMouseEventType,
  NodeWithEvents,
  RadioButton,
  RadioButtonOptions,
  RadioSet,
  RadioSetOptions,
  Text,
  Textarea,
  TextareaOptions,
  Textbox,
  TextboxOptions,
  TextOptions
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
  onClick = 'onClick',
  onKeyPress = 'onKeyPress',
  onRender = 'onRender',
  onChange = 'onChange'
}

// type ArtificialEventAttributes = {
//   [a in ArtificialEventOptionNames]: {
//     methodName: EventOptionNames
//     eventType: NodeMouseEventType | NodeGenericEventType | 'keypress' | 'warning'
//   }
// }

interface ArtificialEvent<T extends Element> {
  currentTarget: T
}

interface BlessedEventOptions {
  [EventOptionNames.key]?: Parameters<NodeWithEvents['key']>
  [EventOptionNames.onceKey]?: Parameters<NodeWithEvents['onceKey']>
  [EventOptionNames.on]?: On<this>
  [EventOptionNames.once]?: On<this>
}
interface ArtificialEventOptions<T extends Element> {
  [ArtificialEventOptionNames.onClick]?: (this: T, e: IMouseEventArg & ArtificialEvent<T>) => void
  [ArtificialEventOptionNames.onKeyPress]?: (this: T, e: { ch: string; key: IKeyEventArg } & ArtificialEvent<T>) => void
  [ArtificialEventOptionNames.onRender]?: (this: T, e: INodeGenericEventArg & ArtificialEvent<T>) => void
  [ArtificialEventOptionNames.onChange]?: <V = any>(this: T, e: ArtificialEvent<T> & { value: V }) => void
}

interface EventOptions<T extends Element> extends BlessedEventOptions, ArtificialEventOptions<T> {}
declare global {
  export namespace JSX {
    export interface IntrinsicElements {
      box: BoxOptions & EventOptions<Box>
      text: TextOptions & EventOptions<Text>
      line: LineOptions & EventOptions<Line>
      textarea: TextareaOptions & EventOptions<Textarea>
      layout: LayoutOptions & EventOptions<Layout>
      button: ButtonOptions & EventOptions<Button>
      checkbox: CheckboxOptions & EventOptions<Button>
      bigtext: BigTextOptions & EventOptions<BigText>
      list: ListOptions & EventOptions<List>
      filemanager: FileManagerOptions & EventOptions<FileManager>
      listtable: ListTableOptions & EventOptions<ListTable>
      listbar: ListbarOptions & EventOptions<ListBar>
      form: FormOptions & EventOptions<Form>
      textbox: TextboxOptions & EventOptions<Textbox>
      radioset: RadioSetOptions & EventOptions<RadioSet>
      radiobutton: RadioButtonOptions & EventOptions<RadioButton>
      // TODO: , Prompts, Prompt, Question, Message, Loading, Data Display, ProgressBar, Log, Table, Special Elements, Terminal, Image, ANSIImage, OverlayImage, Video, Layout
    }
    export interface Element {
      type: keyof IntrinsicElements
      attrs?: { [a: string]: any }
      children: (JSX.Element | string | number | boolean)[]
    }
  }
}

// interface JSX.Element {
//   type: keyof JSX.IntrinsicElements
//   attrs?: { [a: string]: any }
//   children: (JSX.Element | string | number | boolean)[]
// }

type TagFn = TODO
type TagClass = TODO

/**
 * type of the React object as in React.createElement. Note: it could have another name than React, but if so tsconfig needs to be configured (JSXFactory) so for simplicity we name the instance `React`
 */
interface BlessedJsx {
  /**
   * JSX.Element to blessed node factory method. i.e. <box>foo</box> will be translated to React.createElement('box', {}, ['foo'])
   */
  createElement(
    tag: undefined | string | TagFn | TagClass,
    attrs?: undefined | { [a: string]: any },
    ...children: any[]
  ): Node
  /**
   * public method to render JSX.Element to blessed nodes. Currently it does nothing.
   */
  render(e: JSX.Element): Element
  /**
   * Default blessed Node factory for text like "foo" in <box>foo</box>
   */
  createTextNode(e: string | number | boolean, parent: Node): Element
}

export const React: BlessedJsx = {
  createElement(tag, attrs, ...children) {
    let el: Element
    if (typeof tag === 'function' && tag.prototype && tag.prototype.render) {
      const instance = new tag({ ...attrs, children })
      el = instance.render()
      instance.blessedElement = el
    } else if (typeof tag === 'function') {
      el = tag({ ...attrs, children })
    } else if (typeof tag === 'string') {
      // HEADS UP! we only implement attributes and children for intrinsic elements. ClassElement and FunctionElement are responsible of implementing both its attrs and children on their own
      const fn = (blessed as any)[tag] as (options?: any) => Element
      if (!fn) {
        const s = 'blessed.' + tag + ' function not found'
        console.log(s)
        throw new Error(s)
      }
      attrs = attrs || {}
      const eventOptionNames = enumKeys(EventOptionNames)
      const artificialEventOptionNames = enumKeys(ArtificialEventOptionNames)
      const blessedEventMethodAttributes = {} as BlessedEventOptions
      const artificialEventAttributes = {} as ArtificialEventOptions<Element>

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
      el = fn(attrs) as Element
      // generic event handlers
      ;(Object.keys(blessedEventMethodAttributes) as EventOptionNames[]).forEach(methodName => {
        const args = blessedEventMethodAttributes[methodName] as any[]
        ;(el as any)[methodName](...args.map(a => (typeof a === 'function' ? a.bind(el) : a)))
      })
      // artificial event handlers like onClick (these doesn't exist on blessed - we need to map them manually)
      ;(Object.keys(artificialEventAttributes) as ArtificialEventOptionNames[]).forEach(attributeName => {
        if (attributeName === ArtificialEventOptionNames.onClick) {
          const fn = artificialEventAttributes[attributeName]!
          el.on('click', e => {
            fn.bind(el)({ ...e, currentTarget: el })
          })
        } else if (attributeName === ArtificialEventOptionNames.onKeyPress) {
          const fn = artificialEventAttributes[attributeName] as ArtificialEventOptions<Element>['onKeyPress']
          el.on('keypress', (ch, key) => {
            fn!.bind(el)({ ch, key, currentTarget: el })
          })
        } else if (attributeName === ArtificialEventOptionNames.onRender) {
          const fn = artificialEventAttributes[attributeName] as ArtificialEventOptions<Element>['onRender']
          el.on('render', e => {
            fn!.bind(el)({ ...e, currentTarget: el })
          })
        } else if (attributeName === ArtificialEventOptionNames.onChange) {
          const fn = artificialEventAttributes[attributeName] as ArtificialEventOptions<Element>['onChange']
          // if(el instanceof blessed.checkbox){
          el.on('check', e => {
            fn!.bind(el)({ ...e, currentTarget: el, value: (el as Checkbox).value })
          })
          el.on('uncheck', e => {
            fn!.bind(el)({ ...e, currentTarget: el, value: (el as Checkbox).value })
          })
          // }
        } else {
          console.log('Unrecognized artificialEventAttribute ' + attributeName)
          // TODO: debug
        }
      })
      // append children
      children.forEach(c => {
        if (!c) {
          // Heads up: don't print falsy values so we can write `{list.length && <div>}` or `{error && <p>}` etc
          return
        }
        if (isNode(c)) {
          if (!c.options || !c.options.parent) {
            el.append(c)
          }
        } else if (Array.isArray(c)) {
          c.forEach(c => {
            if (isNode(c)) {
              if (!c.options || !c.options.parent) {
                el.append(c)
              }
            } else {
              this.createTextNode(c, el)
            }
          })
        } else {
          this.createTextNode(c, el)
        }
      })
    } else {
      //TODO:debug
      console.log('Unrecognized tag type ' + tag)
    }

    return el!
  },

  render(e: JSX.Element) {
    return e as any
  },

  createTextNode(c: any, el: Node) {
    return blessed.text({ content: c + '', parent: el })
  }
}

export abstract class Component<P = {}, S = {}> {
  constructor(protected props: P, protected state: S) {}
  abstract render(): void
  /**
   * All class elements will have a reference to its rendered blessed element
   */
  protected blessedElement: Element = undefined as any
  /**
   * very simple setState, by default calls element's render() unless [[dontRenderOnStateChange]]
   */
  protected setState(s: Partial<S>) {
    this.state = { ...this.state, ...s }
    if (!this.dontRenderOnStateChange) {
      this.blessedElement.render()
    }
  }
  protected dontRenderOnStateChange = false
}
