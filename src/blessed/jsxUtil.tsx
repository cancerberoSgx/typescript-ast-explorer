import { format } from 'ansi-escape-sequences'
import { asArray } from 'misc-utils-of-mine-generic'
import { notUndefined, objectMap, objectFilter } from '../util/misc'
import { LayoutOptions, Button as ButtonElement, IMouseEventArg, colors, RadioButtonOptions, ButtonOptions } from './blessedTypes'
import { React } from './jsx/createElement'
import { renderer } from './layoutRenderer'
import { Component } from './jsx/component';
import { ObjectStringKeyValueUnion } from 'misc-utils-of-mine-typescript';

export function Br(props: {}) {
  return (
    <text
      style={{
        //@ts-ignore
        display: 'block'
      }}
      content=""
    />
  )
}

export function NbrSpc(props: {}) {
  return <text content=" " />
}

export function Strong(props: { children?: string | string[]; color?: string }) {
  return (
    <text
      content={format(asArray(props.children || []).join(' '), ['bold', props.color].filter(notUndefined) as any)}
    />
  )
}

interface P extends ButtonOptions {
  onClick: onClickHandler<Button>
  children: string 
}
export class Button extends Component<P, {}> {
  protected defaultOptions(){
    return {  mouse: true,
      clickable: true,
      keys: true,
      keyable: true,
      width: '88%',
      height: 3,
      border: 'line',
      top: 0, left: 0,
      focusable: true,
      style: {
        selected: {
          border: {
            fg: colors.lightgreen
          },
          bg: 'magenta'
        },
        hover: {
          bg: 'blue'
        }
      }}
  }
  render(){
    
    // return 'hello whoshdfihdsofh'
    // {this.props.children}
    // this.onCthis.props.onClick
    // const y : ObjectStringKeyValueUnion
    return <button onClick={e=>this.props.onClick.bind(this)} content={this.props.children+''} {...{style: this.props.style||{}}} {...this.defaultOptions()}></button>

    // const content = (this.props.children as any).join(' ') // a known proble I have with JSX impls
    // return <button onClick={e=>this.props.onClick.bind(this)} content={content} {...{style: this.props.style||{}}} {...this.defaultOptions()}></button>
    // return <button onClick={this.props.onClick.bind(this)} content={this.props.children+''} {...}></button>
  //  return  <button onClick={this.props.onClick.bind(this)} content={'hello'}></button>
  }
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
// TODO: use the type
export type onClickHandler<T extends JSX.ElementType> = (this: T, e: IMouseEventArg ) => void