
import { React } from './jsx'
import { renderer } from './layoutRenderer';
import { LayoutOptions } from './blessedTypes';


export function Br(props: {}) {
  return <text style={{ display: 'block' }} content=" " />;
}

export function Div(props: {
  children?: any;
  }&LayoutOptions) {
  return (<layout {...{...props, children: undefined, height: props.height||'99%', width: props.width||'95%'}} renderer={renderer} >
    {props.children}
  </layout>);
}