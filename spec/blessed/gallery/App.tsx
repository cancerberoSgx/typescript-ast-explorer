import { Screen } from '../../../src/blessed/blessedTypes'
import { Component, React } from '../../../src/blessed/jsx'
import { showInModal } from '../../../src/blessed/modal'
import { ButtonDemo } from './ButtonDemo'
import { CollapsibleDemo } from './CollapsibleDemo'
import { LayoutDemo } from './LayoutDemo'
import { commonOptions } from './util'
import { enumKeys } from 'misc-utils-of-mine-typescript';
import { arrayToObject, enumNoValueKeys, enumValueFromString } from '../../../src/util/misc';

interface P { screen: Screen }
interface S {
  selectedDemo?: Demo
}
enum Demo {
  button, layout, collapsible
}

export class App extends Component<P, S> {
  private renderDemo(d: string) {
    const demo = enumValueFromString(d, Demo)
    if (typeof demo==='undefined') {
      throw new Error('Demo not found ' + d)
    }
    if (demo === Demo.button) {
      return React.render(<ButtonDemo screen={this.props.screen} />)
    }
    else if (demo === Demo.layout) {
      return React.render(<LayoutDemo />)
    }
    else if (demo === Demo.collapsible) {
      return React.render(<CollapsibleDemo />)
    }
    else {
      throw new Error('Demo unknown ' + d)
    }
  }
  render() {
    const { screen } = this.props
    return (
      <box {...commonOptions} parent={screen} top="0%" left="0%" border="line" label="Blessed Gallery">
        <listbar
          {...commonOptions}
          padding={1}
          keys={true}
          mouse={true}
          clickable={true}
          focusable={true}
          focused={true}
          border="line"
          autoCommandKeys={true}
          commands={arrayToObject(enumNoValueKeys(Demo), d => () => showInModal(
            screen,
            this.renderDemo(d),
            `${d} demo (press q to close)`,
            '100%',
            '100%'
          ))}
        />
      </box>
    )
  }
}
