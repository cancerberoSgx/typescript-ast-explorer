import { LayoutOptions } from './blessedTypes'
import { React } from './jsx'
import { renderer } from './layoutRenderer'
import {format, Style, style} from 'ansi-escape-sequences';
import { notUndefined } from '../util/misc';
import { asArray } from 'misc-utils-of-mine-generic';

export function Br(props: {}) {
  return <text style={{ display: 'block' }} content=" " />
}

export function Strong(props: {children?: string|string[], color?: string}) {
  return <text 
  // content = {asArray(props.children||[]).join(' ')}
   content={format(asArray(props.children||[]).join(' '), ['bold', props.color].filter(notUndefined) as any)}
   />
  // , props.color].filter(notUndefined))} />
}

export function Div(
  props: {
    children?: any
  } & LayoutOptions
) {
  return (
    <layout
      {...{ ...props, children: undefined, height: props.height || '99%', width: props.width || '95%' }}
      renderer={renderer}>
      {props.children}
    </layout>
  )
}
