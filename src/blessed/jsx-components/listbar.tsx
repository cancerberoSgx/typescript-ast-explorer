import { colors } from '../blessedTypes';
import { Component } from '../jsx/component';
interface ListBarProps {
  keys: string[];
  callbacks?: [];
}
/**
 * easier API for list bar
 */
class ListBar<T extends ListBarProps, S = {}> extends Component<T, S> {
  protected optionsBase() {
    return {
      width: '88%',
      height: 3,
      border: 'line',
      top: 0, left: 0,
    };
  }
  render() {
    return null;
  }
}
