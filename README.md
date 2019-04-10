# inquirer-code-prompts

Code / Parsing / AST TypeScript / JavasScript related inquirer plugins prompts

Initially part of ts-refactor project, now as individual reusable tools.  

## AST Explorer

User is prompted with TypeScript code and is able to navigate the AST nodes with arrows, type [AST selectors](https://github.com/phenomnomnominal/tsquery#) to filter them, scroll long code text like unix less command, and finally press enter to select one node. The prompt result will be the ts.Node instance. 

```ts
import { astExplorer, AstExplorer } from 'inquirer-code-prompts'
import { registerPrompt } from 'inquirer'

registerPrompt('ast-explorer', AstExplorer as any)
async function test() {
  const code = `
class Animal {
  constructor(public name: string) { }
  move(distanceInMeters: number = 0) {
    console.log('hello');
  }
}
class Snake extends Animal {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}
    `
  const selectedNode = await astExplorer({ code })
  console.log({ selectedNode: selectedNode.getText() });

```

TODO: while user types selectors, it has autocompletion for known node kinds. 

## less

Show long texts to the user supporting vertical scrolling and text wrap  so they can read in peace. Use arrow to scroll and any other key to exit. It doesn't return anything. 

```ts
import {less, Less} form 'inquirer-less'
registerPrompt('less', Less as any)
await less({text: `long text possible with ansi styles`})
```

## Files diff

Show several file's diff inquirering by folder/file and seeing diff with color individual files or the whole thing. 

Example to come.


## TODO 

### general

less parametrize the paginator bottom text

### jsxExplorer

 * navigation with mouse ?

 * should print a breadcrumb and basic info when navigating nodes with arrows.
 
 * should let me visit all childs with arrows withouth filter - should allow to ignore the selector. If user delete all text then it won't filter and let me nav with arrows (see next) 

  * should support hierarchical navigation, I can enter inside childs, and nav outside to ancestors
  keys: right - left arrows go to next node in order of start/pos in the sourceFile. If there is a selector they go to next/prev matched node
  up-down arrows. 

  * with control will let me temporarily ignore the selector and move freely. when control is keyup it modifies the selector to match the current node  