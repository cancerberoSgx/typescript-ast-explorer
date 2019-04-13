import * as blessed from 'blessed'
import { enumKeys } from 'misc-utils-of-mine-typescript'
import { Checkbox, Element, isNode, Node } from '../blessedTypes'
import { Component } from './component'
import {
  ArtificialEventOptionNames,
  ArtificialEventOptions,
  BlessedEventOptions,
  BlessedJsx,
  BlessedJsxAttrs,
  EventOptionNames
} from './types'
interface Options {
  dontInerithStyle?: boolean
}

interface ComponentConstructor<P = {}, S = {}> {
  new (p: P, s: S): Component
}

function isComponentConstructor(tag: any): tag is ComponentConstructor {
  return typeof tag === 'function' && tag.prototype && tag.prototype.render
}

// type  BlessedNodeImpl =  JSX.ReactNode & Element
/**
 In this implementation, all the work is dont by createElement, that returns ready to use blessed elements. Attributes and children are only implemented for intrinsic elements and all blessed types in JSX.IntrinsicElement should be supported. All event handlers in types are supported. 
  */
class BlessedJsxImpl implements BlessedJsx {
  constructor(protected options: Options = {}) {}

  createElement(tag: JSX.ElementType, attrs: BlessedJsxAttrs, ...children: any[]) {
    let el: JSX.ReactNode

    const eventOptionNames = enumKeys(EventOptionNames)
    const artificialEventOptionNames = enumKeys(ArtificialEventOptionNames)
    const blessedEventMethodAttributes = {} as BlessedEventOptions
    const artificialEventAttributes = {} as ArtificialEventOptions<Element>

    if (isComponentConstructor(tag)) {
      tag
      const instance = new tag({ ...attrs, children }, {})
      el = instance.render()
      //@ts-ignore
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
      // ATTRIBUTE NORMALIZATION (remove attributes that are not valid blessed options)
      attrs = attrs || {}

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
    }

    // finished instantiating the Node that BTW is a blessed Element. So we ugly cast it .

    if (typeof tag === 'string') {
      this.installAttirbutesAndChildren(el!, blessedEventMethodAttributes, artificialEventAttributes, children)
    }
    // else {
    //   //TODO:debug
    //   console.log('Unrecognized tag type ' + tag)
    // }

    return el!
  }
  installAttirbutesAndChildren(
    jsxNode: JSX.ReactNode,
    blessedEventMethodAttributes: any,
    artificialEventAttributes: any,
    children: any[]
  ): any {
    const el = jsxNode as Element

      // EVENT HANDLER ATTRIBUTES
      // native event handlers like on(), key() etc are exactly matched agains a blessed method. Exactly same signature.
    ;(Object.keys(blessedEventMethodAttributes) as EventOptionNames[]).forEach(methodName => {
      const args = blessedEventMethodAttributes[methodName] as any[]
      ;(el as any)[methodName](...args.map(a => (typeof a === 'function' ? a.bind(el) : a)))
    })
    // artificial event handlers like onClick, onChange (these doesn't exist on blessed - we need to map/install them manually)
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
        // TODO: verify that element type supports the value change semantic (i.e is a checkbox )?
        el.on('check', e => {
          fn!.bind(el)({ ...e, currentTarget: el, value: (el as Checkbox).value })
        })
        el.on('uncheck', e => {
          fn!.bind(el)({ ...e, currentTarget: el, value: (el as Checkbox).value })
        })
      } else {
        console.log('Unrecognized artificialEventAttribute ' + attributeName)
        // TODO: debug
      }
    })
    // CHILDREN
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
  }

  render(e: JSX.Element) {
    return e as any
  }

  /**
   * Default blessed Node factory for text like "foo" in <box>foo</box>
   */
  protected createTextNode(c: any, el: Node) {
    return blessed.text({ content: c + '', parent: el })
  }

  // protected afterElementCreatedListeners : AfterElementCreatedListener[] = []
}

export const React: BlessedJsx = new BlessedJsxImpl()

// type AfterElementCreatedListener = (event: {el: Element, tag: BlessedJsxTag, attrs: BlessedJsxAttrs, children: any[]})=>void
