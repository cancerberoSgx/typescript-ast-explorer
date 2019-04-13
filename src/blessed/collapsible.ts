import { getElementData, setElementData } from './blessed'
import { Element, IMouseEventArg, Padding } from './blessedTypes'

export function isCollapsed(el: Element) {
  return el.$.collapsible && el.$.collapsible.collapsed
}

export function setCollapsed(el: Element, collapsed: boolean) {
  if (!getElementData<boolean>(el, 'collapsible.installed')) {
    return
  }
  setElementData(el, 'collapsible.collapsed', collapsed)
  if (collapsed) {
    // TODO: consider border and padding
    el.height = getElementData(el, 'collapsible.collapsedHeight') || 2
    el.padding = { top: 0, left: 0, right: 0, bottom: 0 }
  } else {
    el.height = getElementData(el, 'collapsible.originalHeight') || 2
    el.padding = getElementData<Required<Padding>>(el, 'collapsible.originalPadding') || {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
  }
}

export function toggleCollapsed(el: Element) {
  const collapsed = getElementData<boolean>(el, 'collapsible.collapsed')
  setCollapsed(el, !collapsed)
}

interface Options {
  // label?: string
  /** if provided it will set this label when element is collapsed*/
  collapsedLabel?: string
  /** if provided it will set this label when element is uncollapsed*/
  uncollapsedLabel?: string
  /** if provided, element will be collapsed to this height */
  collapsedHeight?: number | string
  /** user can manually call setCollapsed on elements after installCollapsible() or setting this to true, a click listener will be installed to collapse/uncollapse the element on click automatically. Optionally collapseEventPredicate can be set to refine conditions for collapse/uncollapse */
  addClickListener?: true
  collapseEventPredicate?: (e: IMouseEventArg) => boolean
}

export function installCollapsible(el: Element, options: Options = {}) {
  // TODO: listen for resize and update collapsible.originalHeight
  setElementData(el, 'collapsible.originalHeight', el.height)
  setElementData(el, 'collapsible.originalPadding', el.padding)
  setElementData(el, 'collapsible.installed', true)
  setElementData(el, 'collapsible.options', options)
  setElementData(el, 'collapsible.originalLabel', el.options.label)

  if (typeof options.collapsedLabel !== 'undefined') {
    // setElementData(el, 'collapsible.label', options.label)
    el.setLabel({ side: 'left', text: options.collapsedLabel })
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
  const options = getElementData<Options>(el, 'collapsible.options') || {}
  // el.setLabel(options.collapi || '')
  setElementData(el, 'collapsible', {})
}
