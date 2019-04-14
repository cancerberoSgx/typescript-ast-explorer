import { AllOptions, Element, isElement, } from '../blessedTypes'
import { React } from './createElement'
import { getObjectProperty, objectFilter, setObjectProperty } from '../../util/misc';
import { screen } from '../../declarations/blessed';
import { objectKeys } from 'misc-utils-of-mine-generic';

// TODO: what about properties that propagates from children to parents ?
// TODO: what about properties outsides
//TODO: research: to work purely with data / options and not with the elements already instantiated, we should create an intermediary representation  n createElement() and only create the blessed elements in render() so we have the time to process the option/tree before calling blessed constructors.

interface Options {
  /**  exclude some properties for being propagated */
  exclude?:string[]

  /**  */
  include:string[]

  /** TODO. include properties outside options. Careful! */
  otherOptions?: (keyof AllOptions)[]

  /** Like CSS !important. for keys in  here, children options will be override no matter if they explicitly have tgen in their options. Use with care*/
  important?: string[]
}

/** @internal */
export function installOptionsPropagationPlugin(options: Options = {include: ['styles.bg']}){//{exclude: ['hover']}) {
  React.addAfterRenderListener(event => {
    try {
    event.el.children.filter(isElement).forEach(child => copyOptions(event.el, child, options))
      
    } catch (error) {
      event.el.screen.log('instalPropagationPlugin error ', error)
    }
  })

  function copyOptions(parent: Element, child: Element,options: Options) {
      options.exclude = options.exclude || []
      parent.options = parent.options|| {}
      options.important = options.important ||[]
      // const partial = options.exclude ? objectFilter(parent.options||{}, (k,v)=>!(options.exclude||[]).find(e=>!!getObjectProperty(v, e))) : parent.options
      const changes :{key: string, value: any}[]=[]
      // const 
          // objectKeys(parent.options).filter(k=>!options.exclude!.find(e=>!!parent.options && !!getObjectProperty(parent.options, e))).forEach(k=>{
      objectKeys(parent.options).forEach(k=>{
        const included = options.include.includes(k)//.find(e=>!!getObjectProperty(parent.options, e))
    parent.screen.log(parent.type, child.type, 'included', !!included, k)

        if(!included){
          return 
        }
        const excluded = options.exclude!.includes(k)//.find(e=>!!getObjectProperty(parent.options, e))
        const important = options.important!.includes(k)
        const val = getObjectProperty(parent.options, k)
        if(typeof val==='undefined'){
          return 
        }
        const childVal = getObjectProperty(child.options, k)
        let finalVal: any|undefined
        if(excluded){
          if(important){
            finalVal = {...childVal||{}, ...val}
          } 
          else {
            return
          }
        }
        if(typeof childVal==='undefined'){
          finalVal = val
        }
        else {
          finalVal = {...val, ...childVal} // TODO: probably recursive merge needed
          //excluded ? important ? val: childVal : child
        }
        // else {
        //   finalVal = childVal || val
        // }
        if(finalVal){
          changes.push({key: k, value: finalVal})
          // setObjectProperty(partial, k, finalVal)
        }
    })

      // const val = getObjectProperty(parent.options, k)
      // const childVal = getObjectProperty(child.options, k)
      // if(typeof val!=='undefined'){
      //   if(typeof childVal!=='undefined'){
      //     setObjectProperty(partial, k, childVal)

      //   }else {

      //     setObjectProperty(partial, k, val)
      //   }
      // }
      // partial[k] = parent.options![k]
    // })

    parent.screen.log(parent.type, child.type, 'partial', changes)
    // we modify also options so in the next level, descendants will get these also
    child.options = child.options || {}
    child = child || {}
    changes.forEach(c=>{
      setObjectProperty(child.options, c.key, c.value)
      setObjectProperty(child, c.key, c.value) // TODO: review! - perhaps whitelist the keys?
    })
    // Object.assign(child.options, {...partial} )
    // set individually because is the most important
    // Object.assign(child, {...partial||{}} )
    child.children.filter(isElement).forEach(grandChild => {
      copyOptions(child, grandChild, options) // TODO: passing partial to recursion could speed up things?
    })
  }
}