
* dont fork  just add on top of blessing. 
  * Blessing should not be concerned about nice widgets, 
  * high level APIs, or nice thinkgs, these shoul be buit on top of it. 
  * (the image/video thing dhould belong in another paackage)

## ideas for blessing

 * libs on top of it:

### widgets: 

 expand/collapse
 resize
* bavbar with sub-menues
 * NeverHide widget that, if the screen is two small, it will "pop up in a 1 height at bottom or top and if clicked it will show the "hidden" widget (cause is no whough size)

## Layout
 
 more and easier to use layouts / grids with easier apis
 dont create new types, just build on top of existing simpler ones
 good table/tree compoents with model, async, not visuually awesome but nive for modelling data, sorting , filtering, pagination, etc.
 ore layouts? 
 * GRID/LAYOUTS
   * grid like but to let me add/remove dynamically and easy api?
  * grid for vertical?
  * a grid horizontal/vertical that automatically adjuts children and let me add new
  * editor like paradigm so i can group input widgets easily
* tool/paradigm to group/mximizize/minimaszi panels ? 

# query-selection-tree node

* transverse a tree node 
   * transform
   * extract
 * select nodes using some css like language
 * build a data object with the semantic of all the tree (supporting only basic types) so we can
   * destroy a screen and recreate them (focus and event listeners gone?)
   * serialize a UI
   * span another terminal and re-create the AST
 * imo -contrib project focused too much on the visuals - there is no model -or is being destroyed / formatted
 * start by identifieng core Node types and properties and a factory. 
    * minimize node types and props. 
      * with this.props should be enough?
 * extensible layer so implementors can easily hook in their custom elements behavior (that should be based on simple types
 * try not to acccess the lines and only the options/data)

### techonoogies to exploit
 
  fonts unicode for icons?