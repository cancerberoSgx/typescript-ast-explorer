
import * as contrib from 'blessed-contrib'
import * as blessed from 'blessed'
import { installCollapsible, setCollapsed, uninstallCollapsible, toggleCollapsed } from '../../src/blessed/collapsible';
import { installExitKeys, setElementData, onValueChange } from '../../src/blessed/blessed';
import { BoxOptions } from '../../src/blessed/blessedTypes';
import { renderer } from '../../src/blessed/layoutRenderer';
const screen = blessed.screen({ smartCSR: true, log: './log.txt' })


const checkboxOptions: BoxOptions = {
  input: true ,
  mouse: true,
  clickable: true,
  style: {
    bg: 'gray'
  },
  focusable: true,
  // shrink: true
}

// const container = blessed.box({
//   parent: screen,
//   ...checkboxOptions
// })
const layout = blessed.layout({
  ...checkboxOptions,
  parent: screen,
  top: '0%',
  left: '0%',
  width: '100%',
  height: '100%',
  border: 'line',
  style: {
    bg: 'gray'
  },
  renderer: renderer
})

const collapsibleCheckbox = blessed.checkbox({
  ...checkboxOptions,
  parent: layout,
  content: 'Collapsible ?',
})    

onValueChange(collapsibleCheckbox, value=>{
  if(value){
    installCollapsible(layout, {collapsedHeight: 3})
  }
  else {
    uninstallCollapsible(layout)
  }
  screen.render()
})

const collapsedCheckbox = blessed.checkbox({
 ...checkboxOptions,
  parent: layout,
  content: 'Collapsed ?',
}) 

onValueChange(collapsedCheckbox, value=>{
  toggleCollapsed(layout)
  screen.render()
})

const note = contrib.markdown({
  ...checkboxOptions,
  parent: layout,
  width: '99%',
  padding: {left: 3},
  style: {bg: 'gray'},
}) 

note.style.bg='gray'

note.setMarkdown(`

# Notes

Change **Collapsible** to install / uninstall collapse support in the box.

Change **Collapse** to collapse / uncollapse the box.

Note: if Collapsible is false, then the box won't never be collapsed.

  `)


installExitKeys(screen)

screen.render()

