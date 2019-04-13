import * as blessed from 'blessed'
import { findDescendantNode, installExitKeys } from '../../src/blessed/blessed'
import { BoxOptions, Textarea, ElementOptions } from '../../src/blessed/blessedTypes'
import { React, Component } from '../../src/blessed/jsx'
import { bar } from '../../src/declarations/blessed-contrib';
import { showInModal } from '../../src/blessed/modal';
import { renderer } from '../../src/blessed/layoutRenderer';
import { randomIntBetween } from 'misc-utils-of-mine-generic';

const screen = blessed.screen({ smartCSR: true })
installExitKeys(screen)

const commonOptions: BoxOptions = {
  style: {
    bg: 'gray',
    fg: 'black',
  },
  mouse: true,
  clickable: true,
  keys: true,
  keyable: true,
}

function number() {
  return Math.round(Math.random() * 100) + ''
}
function color(){
  const colors =   ['red', 'blue', 'cyan', 'green', 'magenta', 'yellow', 'brown']
  return colors[randomIntBetween(0, colors.length-1)]
}

function Br(props:{}){
  return <text style={{display:'block'}}/>
}

function Div(props:{children?: any}){
  return <layout renderer={renderer} width="90%" height="90%">
  {props.children}
  </layout>
}

class ButtonDemo extends Component {
  render() {
    return <Div>
      This is a simple button that changes its label each time it's clicked.
      <Br/>
      <button content="click me" clickable={true} mouse={true}       border="line" 
      padding={1}       align="center" 
      width="50%"       height={5}
      valign="middle"       style={{border: {fg: 'cyan'      }, hover: { bg: 'green' } , bg: 'magenta'}} 
      onClick={e => {
    e.currentTarget.setText(e.currentTarget.getText() + number())
    screen.render()
    }} />

<Br/>
The end.

    
    </Div>
  }
}
class LayoutDemo extends Component {
  render() {
    return       <Div>
      This demo shows how to use three built in blessed layout implementations. The first two are 'inline' and 'inline-block that are quite similar: <Br/>

      <layout width={20} height={10} border="line" layout="inline">
      this is just some text that <box height={3} width={3} border="line" style={{fg: 'blue', bold: true, border:{fg: 'magenta'}}} content="B"></box> should be displayed like CSS display: inline
      </layout>
   
    <layout width={20} height={10} border="line" layout="inline-block">
      this is just some text that  <box height={3} width={3} border="line" style={{fg: 'blue', bold: true, border:{fg: 'magenta'}}} content="B"></box> should be displayed like CSS display: inline-block
      </layout>

      <Br/>
      Finally the 'grid' layout that will create an automatic grid based on element dimensions. The grid cells' width and height are always determined by the largest children in the layout.      <Br/>

    <layout width={50} height={20} border="line" layout="grid"> 
    {new Array(10).fill(0).map((e, i)=>
      <box width={Math.random() > 0.5 ? 5 : 10} height={Math.random() > 0.5 ? 3 : 7} style={{bg: color()}} border="line" content={(i + 1 + 12) + ''}></box>
      )}
      </layout>
    </Div>
  }
}

try {
React.render(
  <box {...commonOptions} parent={screen} top="0%" left="0%" border="line" label="Blessed Gallery">
    <listbar  {...commonOptions} padding={1} keys={true} border='line' autoCommandKeys={true} commands={{
      button() {
        showInModal(screen, React.render(<ButtonDemo />), 'Button demo (press q to close)', "90%", "90%")
      },
      layout() {
        showInModal(screen, React.render(<LayoutDemo />), 'Layout demo (press q to close)', "90%", "90%")
      } 
    }}/>
  </box>
)
screen.render()
} catch (error) {
  console.log('ERROR', error);
}