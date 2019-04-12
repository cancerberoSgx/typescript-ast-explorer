import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'
import { installExitKeys, onValueChange } from '../../src/blessed/blessed'
import { BoxOptions } from '../../src/blessed/blessedTypes'
import { installCollapsible, toggleCollapsed } from '../../src/blessed/collapsible'
import { renderer } from '../../src/blessed/layoutRenderer'

const screen = blessed.screen({ smartCSR: true,  log: './log.txt' })

const checkboxOptions: BoxOptions = {
  input: true,
  mouse: true,
  clickable: true,
  style: {
    bg: 'gray'
  },
  focusable: true
}

var layout = blessed.layout({
  parent: screen,
  ...checkboxOptions,
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  border: 'line',
  style: {
    overflow: 'hidden'
  },
  renderer
})

installCollapsible(layout, { collapsedHeight: 3 })

const collapsedCheckbox = blessed.checkbox({
  ...checkboxOptions,
  parent: layout,
  content: 'Collapsed ?'
})

onValueChange(collapsedCheckbox, value => {
  toggleCollapsed(layout)
  screen.render()
})

const note = contrib.markdown({
  ...checkboxOptions,
  parent: layout,
  width: '40%',
  padding: 2,
  markdown: `
  # Notes
  
   * Because layout style.overflow=hidden when collapsed, because this text wont be shown. 
   * because this element has style.display=block it will be rendered in a new line no mater the layout is inline and there is space for it.
   * 
    `  
})
note.style.display = 'block'
note.style.bg = 'gray'

installExitKeys(screen)

screen.render()
