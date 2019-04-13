import { Component, React } from '../../../src/blessed/jsx';
import {  number } from "./util";
import { Screen } from '../../../src/blessed/blessedTypes';
import { Div, Br } from '../../../src/blessed/jsxUtil';

export class ButtonDemo extends Component<{screen: Screen}> {
  render() {
    return (<Div>
      This is a simple button that changes its label each time it's clicked.
        <Br />
      <button content="click me" clickable={true} mouse={true} border="line" padding={1} align="center" width="50%" height={5} valign="middle" style={{ border: { fg: 'cyan' }, hover: { bg: 'green' }, bg: 'magenta' }} onClick={e => {
        e.currentTarget.setText(e.currentTarget.getText() + number());
        this.props.screen.render();
      }} />
      <Br />
      The end.
      </Div>);
  }
}
