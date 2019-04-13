# typescript-ast-explorer

WIP

 * Early proof of the concept [screen casts](demos.md)
 * explore a local TypeScript project with an Command Line interactive tool. 
 * See it file structure and the AST nodes inside each file. 
 * Navigate through the AST and source code like. 


## Issues

### blessing issues
 * it seems that some state is stored in options.style and so, if the same object is passed to multiple elements constructurs, they all start sharing the state , like focus, selected, etc. WOrkaround: user always copy the object but IMO is blessing issue. 


 * in file view - remove details parent and leave the children only.
 * should we add the code view in the file view?
 * currently, because of custom  .d.ts, the project needs to declare the types in its own ts.config.json
 * file view: expand first folder automatically.
 * when switching from files view to code view it should open in last viewed node and vice versa - auto-expanding the tree

## TODO 

 * query elements across the project using CSS-like language (tsquery)
 * filter nodes by kind or name  or query
 * apply refactors interactively
 * tree expand all - collapse all
 * move the tree to its own file
 * stateful modal, selections, expansions, etc
 * show errors except in modals
 + navigate with arrows 2-d instead of tab only (1-d)
 * a general option/menu to hide boxes - or perhaps a halo on them to collapse ?
 * confirmation before exit
 * move blessed reusable utilities to their own package
 
## crazy

## blessed TODO/ideas
 
 * jsx screen
 * a provider for common props so style is propagated and mixed in childern
 * refs ? 