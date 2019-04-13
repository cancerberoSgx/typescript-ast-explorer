import { Element, BoxOptions, LayoutOptions, TextareaOptions, NodeWithEvents, ButtonOptions, InputOptions, NodeMouseEventType, NodeScreenEventType, NodeGenericEventType, Screen, IMouseEventArg, IKeyEventArg } from './blessedTypes';
import * as blessed from 'blessed'
import { TODO, enumKeys } from 'misc-utils-of-mine-typescript';
import { installExitKeys } from './blessed';


type On<T> = Parameters<(event: NodeMouseEventType, callback: (arg: IMouseEventArg) => void) => T> | Parameters<(event: 'keypress', callback: (ch: string, key: IKeyEventArg) => void) => T> | Parameters<(event: string, listener: (...args: any[]) => void) => T> | Parameters<(event: 'warning', callback: (text: string) => void) => T> | Parameters<(event: NodeGenericEventType, callback: () => void) => T>

enum EventOptionNames {
  key = 'key',
  onceKey = 'onceKey',
  on = 'on',
  once = 'once'
}

enum ArtificialEventOptionNames {
  onClick = 'onClick',
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
  type: keyof JSX.IntrinsicElements ,
  attrs?: { [a: string]: any }
  children: (BlessedElement | string | number | boolean)[]
}

type TagFn = TODO
type TagClass = TODO

const React: {
  createElement: (tag: undefined | string | TagFn | TagClass, attrs?: undefined | { [a: string]: any }, ...children: any[]) => Element
  render: (e: BlessedElement) => Element
} = {
  createElement(tag, attrs, ...children) {
    // return { type: tag, attrs, children}//attrs: Object.keys(attrs || {}).map(a => ({ name: a, value: (attrs || {})[a] })), children }
    const fn = (blessed as any)[tag] as (options?: any) => Element
    if(!fn){
      
      console.log(tag, fn);
      return undefined
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
    
    console.log(Object.keys(attrs));
    
    const el:any = fn(attrs)
    // Object.keys(genericEventAttributes).forEach(methodName=>{
    //   const methodArguments = genericEventAttributes[methodName]
    //   el[methodName].apply(el, methodArguments.map((a:any)=>typeof a === 'function' ? a.bind(el) : a))// el.on('click', ...) or el.key(['c','q'], ..)
    // })
    // if(artificialEventAttributes[ArtificialEventOptionNames.onClick]){
    //   el.on('click', artificialEventAttributes[ArtificialEventOptionNames.onClick].bind(el))
    // }
    
    return el
    // return this.createElement(e).type as any

  },
  
  render(e: BlessedElement) {
    return this.createElement(e.type, e.attrs, e.children) 
  }
}

try {
  
const screen = blessed.screen({ smartCSR: true })
installExitKeys(screen)

// const box = React.render(<box content='hehehehehe' key={['q', (ch, key) => { console.log(key.name) }]}>hello <layout><button content='label' on={['click', (e: IMouseEventArg) => {
//   throw 1
// }]}></button></layout></box>)


React.render(<box parent={screen} top="50%" content='hehehehehe'></box>)
// console.log(box.type, box.content);

// screen.append(box)
// blessed.box({content: 'fooo', parent: screen})
screen.render()

} catch (error) {
  console.log(error);
  
}

// console.log());

// describe('blessed', () => {
//   it('intrinsic', () => {
//     const r = React.render(<box>hello <layout></layout></box>)
//     console.log(r);
//   })
// })

// function value(a: any) : string{
//   if(typeof a === 'string'){
//     return `'${a}'`
//   }
//   else if(Array.isArray(a)){
//     return `[${a.map(e=>value(e)).join(', ')}]`
//   }
//   else {
//     return a + ''
//   }
// }
    // attrs = attrs ||{}
    // console.log(typeof tag, tag, children);
    // if (attrs) {
    //   Object.keys(attrs).forEach(a => {
    //     console.log(a, attrs[a]);
    //   })
    // }
    // children.forEach(c=>{
    //   console.log(c);

    // })
    // const tagString = typeof tag ==='string' ? tag : typeof tag ==='undefined'? 'text' : tag // TODO: tag == function or class
    // const outputAttrs = attrs ?Object.keys(attrs||{}).map(a=>`${a}: ${value(attrs[a])}`).concat(`children: [${children.map(c=>['string','number','boolean'].includes(typeof c)  ? value(c) : c.text). join(', ')}]`) : []
    // const output = `blessed.${tagString}(${attrs ? `{ ${outputAttrs.join(', ')} }` : ''})` as any
    // console.log(output);