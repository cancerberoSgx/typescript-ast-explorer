import * as blessed from 'blessed';
import { installExitKeys } from '../../src/blessed/blessed';
import { React } from '../../src/blessed/jsx';

const screen = blessed.screen({ smartCSR: true })
installExitKeys(screen)
React.render(<box parent={screen} top="50%" content="hehehehehe" />)
screen.render()

