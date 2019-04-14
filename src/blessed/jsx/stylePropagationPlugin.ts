import { AllOptions, Element, isElement, Style } from '../blessedTypes'
import { React } from './createElement'
import { getObjectProperty, objectFilter, setObjectProperty } from '../../util/misc';
import { screen } from '../../declarations/blessed';
import { objectKeys } from 'misc-utils-of-mine-generic';

// TODO: what about properties that propagates from children to parents ?
// TODO: what about properties outside styles
// important: ['hover.bg']: override children no matter if they explicitly declared that style
//TODO: research: to work purely with data / options and not with the elements already instantiated, we should create an intermediary representation  n createElement() and only create the blessed elements in render() so we have the time to process the option/tree before calling blessed constructors.

interface Options {
  /**  exclude some properties for being propagated */
  exclude?:string[]

  /**  */
  include:string[]

  /** TODO. include properties outside options.style. Careful! */
  otherOptions?: (keyof AllOptions)[]
}

/** @internal */
export function installStylePropagationPlugin(options: Options = {include: ['bg', 'fg']}){//{exclude: ['hover']}) {
  React.addAfterRenderListener(event => {
    try {
    event.el.children.filter(isElement).forEach(child => copyStyle(event.el, child, options))
      
    } catch (error) {
      event.el.screen.log('installStylePropagationPlugin error ', error)
    }
  })

  function copyStyle(parent: Element, child: Element,options: Options) {
    options.exclude = options.exclude || []
    parent.options.style = parent.options.style|| {}
    // const partial = options.exclude ? objectFilter(parent.options.style||{}, (k,v)=>!(options.exclude||[]).find(e=>!!getObjectProperty(v, e))) : parent.options.style
    const partial = {} as any
    
    // objectKeys(parent.options.style).filter(k=>!options.exclude!.find(e=>!!parent.options.style && !!getObjectProperty(parent.options.style, e))).forEach(k=>{
    objectKeys(parent.options.style).filter(k=>options.include.find(e=>!!getObjectProperty(parent.options.style!, e))&&!options.exclude!.find(e=>!!getObjectProperty(parent.options.style, e))).forEach(k=>{

      const val = getObjectProperty(parent.options.style, k)
      const childVal = getObjectProperty(child.options.style, k)
      if(typeof val!=='undefined'){
        if(typeof childVal!=='undefined'){
          setObjectProperty(partial, k, childVal)

        }else {

          setObjectProperty(partial, k, val)
        }
      }
      // partial[k] = parent.options.style![k]
    })

    parent.screen.log(parent.type, child.type, 'partial', partial)
    // we modify also options.style so in the next level, descendants will get these also
    child.options.style = child.options.style || {}
    Object.assign(child.options.style, {...partial, ...(child.options.style || {})} )
    child.style = child.style || {}
    Object.assign(child.style, {...partial, ...(child.options.style || {})} )
    child.children.filter(isElement).forEach(grandChild => {
      copyStyle(child, grandChild, options)
    })
  }
}