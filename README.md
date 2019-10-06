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

 - [ ] --tsConfigPath - to load a ts project other then current folder's
 - [x] use accursed and remove a lots of files. 
 - [ ] API to reuse as AST node selector - project file / folder selector
 - [ ] query elements across the project using CSS-like language (tsquery)
 - [x] filter nodes by kind or name  or query
 - [x] apply refactors interactively
 - [ ] tree expand all - collapse all
 - [x] move the tree to its own file
 - [ ] stateful modal, selections, expansions, etc
 - [ ] show errors except in modals
 - [x] navigate with arrows 2-d instead of tab only (1-d)
 - [x] a general option/menu to hide boxes - or perhaps a halo on them to collapse ?
 - [ ] confirmation before exit
 - [x] move blessed reusable utilities to their own package
 
 * in file view - remove details parent and leave the children only.
 * should we add the code view in the file view?
 * currently, because of custom  .d.ts, the project needs to declare the types in its own ts.config.json
 * file view: expand first folder automatically.
 * when switching from files view to code view it should open in last viewed node and vice versa - auto-expanding the tree
