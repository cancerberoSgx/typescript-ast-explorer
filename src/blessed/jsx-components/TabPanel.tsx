import { IMouseEventArg, colors, ButtonOptions } from '../blessedTypes';
import { Component } from '../jsx/component';
import { React } from '../jsx/createElement'
import { Div } from './jsxUtil';

interface P extends ButtonOptions {
  // children: Tab[];
}

abstract  class Base<T={}, S={}> extends Component<T, S>  {
  protected optionsBase() {
    return {

      width: '88%',
      height: 3,
      border: 'line',
      top: 0, left: 0,
      
    }
  }
  protected optionsInputBase() {
    return {
      mouse: true,
      clickable: true,
      keys: true,
      keyable: true,
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
      }
    }
  }
}

/**
 This is the idea: 
 ```
<TabPanel>
<Tab>
<Label><Label>
<Body></Body>
</Tab>
</TabPanel>
 ```
 */
export class TabPanel extends Base<P, {}> {
 
  render() {
    return null
// return   <Div {...this.optionsBase()} width="100%" height="100%">
//       <listbar {...this.optionsInputBase()}  padding={1}
//           top={0}
//           align="center"
//           border="line"
//           width="95%"
//           autoCommandKeys={true}
//           commands={arrayToObject(enumNoValueKeys(Demo), d => () =>
//             showInModal(screen, this.renderDemo(d), `${d} demo (press q to close)`, '100%', '100%')
//           )}
//         /></Div>></listbar>
//     </Div>
  }
}

interface TabProps {
  focused?: boolean
}


