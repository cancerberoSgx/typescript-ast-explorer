# typescript-ast-explorer

## Contents

<!-- toc -->

- [Summary](#summary)
- [Install](#install)
- [Usage](#usage)
- [Options](#options)
- [TODO](#todo)

<!-- tocstop -->

## Summary

 * Demo [screen casts](https://cancerberosgx.github.io/demos/typescript-ast-explorer/index.html)
 * Explore a local TypeScript project with an Command Line interactive tool. 
 * Navigate through the AST nodes and source code at same time 
 * See it file structure and the AST nodes inside each file. 
 * JavaScript / TypeScript API for GUI component to select files/folders/nodes interactively (based on blessed/accursed/ts-morph)

## Install 
```
npm install -g typescript-ast-explorer
```

## Usage
```
cd my/typescript/project
typescript-ast-explorer
```

## Options

No options - WIP - it's mostly an interactive tool

## TODO 
- [ ] re implement the GUI using accursed, TSX without contrib, with proper focus/event managers.
- [ ] --tsConfigPath - to load a ts project other then current folder's
- [ ] confirmation before exit
- [ ] modals
  - [ ] stateful modal, selections, expansions, etc
  - [ ] help modal - scroll in modals not working
  - [ ] show errors in modals
- [ ] tree expand all - collapse all
- [ ] filter nodes
  - [ ] (tsquery - cannabis) to filter nodes
  - [ ] the tree will only show matches
  - [ ] the editor still show non matched nodes but greyed-out
- [x] use accursed and remove a lots of files. 
- [x] API to reuse as AST node selector - project file / folder selector
- [x] filter nodes by kind or name  or query
- [x] apply refactors interactively
- [x] move the tree to its own file
- [x] navigate with arrows 2-d instead of tab only (1-d)
- [x] a general option/menu to hide boxes - or perhaps a halo on them to collapse ?
- [x] move blessed reusable utilities to their own package
- [x] unify code and file view in a single one - simplify layout - remove screen reset hack
 
 * in file view - remove details parent and leave the children only.
 * currently, because of custom  .d.ts, the project needs to declare the types in its own ts.config.json
 * file view: expand first folder automatically.
 * when switching from files view to code view it should open in last viewed node and vice versa - auto-expanding the tree
