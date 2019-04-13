import { React, Component } from '../../../src/blessed/jsx';
import { showInModal } from '../../../src/blessed/modal';
import { ButtonDemo } from './ButtonDemo';
import { LayoutDemo } from './LayoutDemo';
import { commonOptions } from "./util";
import { Screen } from '../../../src/blessed/blessedTypes';
import { CollapsibleDemo } from './CollapsibleDemo';

export class App extends Component<{screen: Screen}>{
render(){
  const {screen } = this.props
  return <box {...commonOptions} parent={screen} top="0%" left="0%" border="line" label="Blessed Gallery">
    <listbar {...commonOptions} padding={1} keys={true} border="line" autoCommandKeys={true} commands={{
      button() {
        showInModal(screen, React.render(<ButtonDemo screen={screen}/>), 'Button demo (press q to close)', '90%', '90%');
      },
      layout() {
        showInModal(screen, React.render(<LayoutDemo />), 'Layout demo (press q to close)', '90%', '90%');
      },
      collapsible() {
        showInModal(screen, React.render(<CollapsibleDemo />), 'Collapsible demo (press q to close)', '90%', '90%');
      }
    }} />
  </box>;
}
}