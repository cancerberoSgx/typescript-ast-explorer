import { Component, React } from '../../../src/blessed/jsx';
import { renderer } from '../../../src/blessed/layoutRenderer';
import { Br, Div } from '../../../src/blessed/jsxUtil';
import { BoxOptions, INodeGenericEventArg } from '../../../src/blessed/blessedTypes';
import { showInModal, closeModal } from '../../../src/blessed/modal';
import { screen } from './main';
import { installCollapsible } from '../../../src/blessed/collapsible';

export class CollapsibleDemo extends Component {
  render() {
    const common: BoxOptions = {
      mouse: true, clickable: true, keys: true, keyable: true
    }
    const buttonOptions: BoxOptions = {...common, border: 'line', style: {
      hover: {
        bg: 'blue'
      },
      bg: 'yellow'
    }}
    const radioOptions: BoxOptions = {...common,   style: {
      hover: {
        fg: 'red'
      }
    }}
   const el = <Div>
      Collapsible are a couple of functions, implemented by me (not in blessed distribution) that allow to install "collapse"/"expand" functionality in any blessed Element. Has mainly two modes, manual mode in which user is responsible of adding some buttons to trigger the collapse/expand when user clicks them, and a automatic mode, in which these handlers will be installed automatically on the element. <Br />

      Automatic Mode:
      <Br />

      <layout {...common}
      // on={['render', this.installCollapsible1.bind(this)]}
      onRender={e=>installCollapsible(e.currentTarget, {auto: true})}
       label="New Contact" 
       renderer={renderer} 
       width="80%" height="40%" border="line">

        <textbox  {...common} content="Tell us your name" /><Br />

        <checkbox  {...common} content="Female?"></checkbox><Br />

        <radioset  {...common} label="Level" height={5} border="line">
          <radiobutton  {...common} top={0} content="Afraid of hights" />
          <radiobutton  {...common} top={1} content="Sometimes I'm fast" checked={true} />
          <radiobutton  {...common} top={2} content="Petrol in my veins" />
        </radioset><Br />

<checkbox  {...common} content="Do you Accept the licence and foo bar a lot of text here that needs to be collapsed" /><Br />
        <button  {...buttonOptions} content="Submit"/> 
    <button  {...buttonOptions} content="Go back"/> 
      </layout>
    </Div>
    
    return el
  }
  // protected installCollapsible1(e: INodeGenericEventArg){
  //     installCollapsible(this.blessedElement.f, {})
  //   // closeModal(screen)
  //   showInModal(screen,  !!this.blessedElement+' - '+ JSON.stringify(e))
  //   // console.log(e);
  //   // screen.render()
    
  // }
}
