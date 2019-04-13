import * as blessed from 'blessed'
import { installExitKeys } from '../../../src/blessed/blessed'
import { React } from '../../../src/blessed/jsx'
import { App } from './App'

export const screen = blessed.screen({
  smartCSR: true,
  log: 'log.txt',
  focusable: true,
  autoPadding: true,
  sendFocus: true
})
installExitKeys(screen)
React.render(<App screen={screen} />)
screen.render()

setInterval(() => {
  screen.render()
}, 5000)
