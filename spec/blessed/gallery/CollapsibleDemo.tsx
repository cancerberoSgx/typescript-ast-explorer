import { BoxOptions } from '../../../src/blessed/blessedTypes'
import { installCollapsible, toggleCollapsed } from '../../../src/blessed/collapsible'
import { Component, React } from '../../../src/blessed/jsx'
import { Br, Div, Strong } from '../../../src/blessed/jsxUtil'
import { renderer } from '../../../src/blessed/layoutRenderer'

export class CollapsibleDemo extends Component {
  render() {
    const common: BoxOptions = {
      mouse: true,
      clickable: true,
      keys: true,
      keyable: true,
      // draggable: false
    }
    const buttonOptions: BoxOptions = {
      ...common,
      border: 'line',
      style: {
        hover: {
          bg: 'blue'
        },
        bg: 'yellow'
      }
    }
    const radioOptions: BoxOptions = {
      ...common,
      style: {
        hover: {
          fg: 'red'
        }
      }
    }
    const el = (
      <Div>
        Collapsible are a couple of functions, implemented by me (not in blessed distribution) that allow to install
        "collapse"/"expand" functionality in any blessed Element.  <Br />
        Has mainly two modes,
<Strong>Manual mode</Strong> in which user is
                responsible of adding some buttons to trigger the collapse/expand when user clicks them, and a
<Strong>Automatic mode</Strong>,
        in which these handlers will be installed automatically on the element and also hiding children, updating labels, visual feedback, etc<Br />

        <layout
          width="100%"
          // bottom="100%"
          height="50%"
          renderer={renderer}
        >
          <layout
            width="50%"
            height="100%"
            renderer={renderer}
          >
            <Br />
            <Strong>Automatic mode:</Strong>
            <Br />
            <layout
              onRender={e => installCollapsible(e.currentTarget, { auto: true })}
              label="New Contact"
              renderer={renderer}
              width="100%"
              height="100%"
              border="line">
              <textbox {...common} content="Tell us your name" />
              <Br />

              <checkbox {...common} content="Female?" />
              <Br />

              <radioset  label="Level" height={5} border="line">
                <radiobutton {...radioOptions} top={0} content="Afraid of hights" />
                <radiobutton {...radioOptions} top={1} content="Sometimes I'm fast" checked={true} />
                <radiobutton {...radioOptions} top={2} content="Petrol in my veins" />
              </radioset>
              <Br />

              <checkbox
                {...common}
                content="Do you Accept the licence and foo bar a lot of text here that needs to be collapsed"
              />
              <Br />
              <button {...buttonOptions} content="Submit" />
              ---
          <button {...buttonOptions} content="Go back" />
            </layout>
          </layout>

          <layout
            width="50%"
            height="100%"
            renderer={renderer}
          >
            <Br />
            <Strong>Manual mode:</Strong>
            <Br />
            <layout
              onRender={e => installCollapsible(e.currentTarget, {collapsedHeight: 5})}
              label="Search Hero"
              renderer={renderer}
              style={{ overflow: 'hidden' }}
              width="100%"
              height="100%"
              border="line">
              <Br />

              <checkbox {...common} style={{fg:'magenta'}} content="Collapsed" checked={false} onChange={e => toggleCollapsed(e.currentTarget.parent as any, true)}></checkbox>
              <Br />
              <Br />
              <textbox {...common} content="By Name" />
              <Br />

              <checkbox {...common} content="Female?" />
              <Br />

              <radioset label="Comic" height={5} border="line">
                <radiobutton {...radioOptions} top={0} content="X-Men" />
                <radiobutton {...radioOptions} top={1} content="Caballeros del Zoodiaco" checked={true} />
                <radiobutton {...radioOptions} top={2} content="StarCraft" />
              </radioset>
              <Br />

              <radioset label="Power Kind" height={5} border="line">
                <radiobutton {...radioOptions} top={0} content="Psionic" />
                <radiobutton {...radioOptions} top={1} content="Brute force" checked={true} />
                <radiobutton {...radioOptions} top={2} content="Magic" />
              </radioset>
              <Br />

              <checkbox
                {...common}
                content="Include Secondary Heroes"
              />
              <Br />
              <button {...buttonOptions} content="Submit" />
              ---
          <button {...buttonOptions} content="Go back" />
            </layout>
          </layout>

        </layout>

      </Div>
    )

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
