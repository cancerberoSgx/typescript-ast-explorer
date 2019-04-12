import { getElementData, setElementData } from './blessed'
import { Element, IMouseEventArg } from './blessedTypes'

export function isCollapsed(el: Element) {
  return el.$.collapsible && el.$.collapsible.collapsed
}

export function setCollapsed(el: Element, collapsed: boolean) {
  if (!getElementData<boolean>(el, 'collapsible.installed')) {
    return
  }
  setElementData(el, 'collapsible.collapsed', collapsed)
  if (collapsed) {
    el.height = getElementData(el, 'collapsible.collapsedHeight') || 2
  } else {
    el.height = getElementData(el, 'collapsible.originalHeight') || 2
  }
}

export function toggleCollapsed(el: Element) {
  const collapsed = getElementData<boolean>(el, 'collapsible.collapsed')
  setCollapsed(el, !collapsed)
}

interface Options {
  /** if provided it will set label and collapsed/uncollapsed icons to the element. Optionally icons can be provided with [[collapsedIcon]], [[collapsedIcon]] */
  label?: string
  collapsedIcon?: string
  unCollapsedIcon?: string
  /** if provided, element will be collapsed to this height */
  collapsedHeight?: number | string
  /** user can manually call setCollapsed on elements after installCollapsible() or setting this to true, a click listener will be installed to collapse/uncollapse the element on click automatically. Optionally collapseEventPredicate can be set to refine conditions for collapse/uncollapse */
  addClickListener?: true
  collapseEventPredicate?: (e: IMouseEventArg) => boolean
}

export function installCollapsible(el: Element, options: Options = {}) {
  //TODO: listen for resize and update collapsible.originalHeight
  setElementData(el, 'collapsible.originalHeight', el.height)
  setElementData(el, 'collapsible.installed', true)
  setElementData(el, 'collapsible.collapsedHeight', options.collapsedHeight || 2)

  if (typeof options.label !== 'undefined') {
    setElementData(el, 'collapsible.label', options.label)
    el.setLabel({ side: 'left', text: 'x ' + options.label })
  }
  if (options.addClickListener) {
    const listener = (e: IMouseEventArg) => {
      if ((options.collapseEventPredicate && options.collapseEventPredicate(e)) || e.button === 'left') {
        toggleCollapsed(el)
      }
    }
    el.on('click', listener)
    setElementData(el, 'collapsible.listener', listener)
  }
}

export function uninstallCollapsible(el: Element) {
  if (!getElementData<boolean>(el, 'collapsible.installed')) {
    return
  }
  setElementData(el, 'collapsible.installed', false)

  const l = getElementData<(...args: any[]) => void>(el, 'collapsible.listener')
  if (l) {
    el.off('click', l)
  }
  el.setLabel(getElementData(el, 'collapsible.label') || '')
  setElementData(el, 'collapsible.listener', undefined)
  setElementData(el, 'collapsible.label', undefined)
  setElementData(el, 'collapsible.originalHeight', undefined)
}
