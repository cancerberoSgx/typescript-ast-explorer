import { AllOptions, Element, isElement, Style } from '../blessedTypes'
import { React } from './createElement'

// TODO: what about properties that propagates from children to parents ?
// TODO: what about properties outside styles
//TODO: research: to work purely with data / options and not with the elements already instantiated, we should create an intermediary representation  n createElement() and only create the blessed elements in render() so we have the time to process the option/tree before calling blessed constructors.

interface Options {
  /** TODO! exclude some properties for being propagated */
  exclude?: keyof Style[]
  /** TODO. include properties outside options.style. Careful! */
  otherOptions?: (keyof AllOptions)[]
}

/** @internal */
export function installStylePropagationPlugin(options: Options = {}) {
  React.addAfterRenderListener(event => {
    // event.el.children.filter(isElement).forEach(child => copyStyle(event.el, child))
  })

  function copyStyle(parent: Element, child: Element) {
    child.style = { ...(parent.options.style || {}), ...(child.options.style || {}) }
    child.children.filter(isElement).forEach(grandChild => {
      copyStyle(child, grandChild)
    })
  }
}

// React.addBeforeElementCreatedListener(event => {
//   // screen.log('children of', event.name, event.children.map(c=>c.type))
//   event.children.filter(isElement).forEach(c => {
//     const style = { ...event.options.style, ...c.options.style }
//     screen.log(c.type, style)
//     Object.assign(c.style, style)
//     // c.style = style
//   })
//   // console.log(event.children[0]);
//   return undefined
// })
