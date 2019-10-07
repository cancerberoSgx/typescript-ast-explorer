import { contrib } from 'accursed'

export function help() {
  const markdown = contrib.markdown({
    mouse: true,
    scrollable: true,
    clickable: true,
    scrollbar: {
      style: {
        inverse: true
      }
    }
  })
  markdown.setMarkdown(
    `
# Welcome to typescript-ast-explorer

Right now this is a work in progress, half research on command line interfaces, half a yet-to-be-designed tool to explore and manipulate TypeScript projects.

##  Navigation

You can focus the other tools with TAB key. You should notice the focused element has a ${ansi.format('red', [
      'red'
    ])} border. If it's a button you can press enter to "click" it.

Also, in general you can also use the mouse to active stuff.

Some tools open in a modal (like this help). For closing the modal, press 'q' or 'ESC'.

### Layout

It tries to be responsive and adapt to any terminal size. 

You can drag and drop the panels if you like.

May be too many boxes ? suggestions accepted. I'm new on this. 

WIP: dynamic layout / grid - collapsible , resizable. 

## Exiting

At any moment you can press 'q', or 'ESC' or 'control-c' to exit the application.

## File tree View

When you start the application, it will show the files of the current's folder TypeScript project.

You can move around the file tree with the up and down arrow keys and pressing SPACE or ENTER they will expand or collapse.

When you open a SourceFile in the tree, you will notice that it will expand showing its AST nodes, like declarations, statements, etc.

## Code View

Using the bottom toolbar, "Code View" you can open the current source file in another view that will show you only this file's Nodes and also the file code's at the right. 

You will notice that while navigating through the node tree, the source code will highlight and scroll the node. And vice-versa, when you click on the code, the node will be shown in the tree at the left. 

## About the Project

This project is WIP and has many objectives / ideas. You can visit / contribute by going to https://github.com/cancerberoSgx/typescript-ast-explorer

The final vision is that you not only explore your project, but also apply refactor tools and even (who knowns) compile and edit the source here!

Let's see what the future says...

Hope you enjoy.

              `.trim()
  )
  return markdown
}
const ansi = require('ansi-escape-sequences')
