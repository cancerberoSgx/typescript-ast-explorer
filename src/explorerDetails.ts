import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'
import { buildNodeActions } from './nodeActions'
import { isBlessedElement } from './util/blessed'
import { scrollableOptions } from './util/common'
import { GeneralNode, isNode, selectNode } from 'ts-simple-ast-extra';
import { getCurrentView } from './store/state';
import { ActionType, ActionListener, ActionListenerType, ACTION_LISTENER } from "./store/actions";
import { Store } from "./store/store";
import { Statement } from 'ts-morph';
import { getGeneralNodeKindName, getGeneralNodeName, getGeneralNodePath } from './util/project';
import { pwd } from 'shelljs';
import { toEditorSettings } from 'typescript/lib/tsserverlibrary';
import { showInModal } from './util/modal';

export function buildDetails(
  // grid: contrib.grid,
  store: Store,
  // screen: blessed.Widgets.Screen,
  // row: number, column: number, rowSpan: number, columnSpan: number,
  // getLastTableData?: ()=>GeneralNode|undefined
  // showValueBox?: boolean

) {
  const {screen, project} = store.state
  const view = getCurrentView(store.state)
  const {grid, verticalOffset: offset} = view
  
  // const showValue = store.state.currentView !== 'code'
  // const offset =showValue ? store.state.fileView.verticalOffset : store.state.codeView.verticalOffset
  // const [row, column, rowSpan, columnSpan] = 

  // ails(grid, screen, 0, 6, 12 - offset, 6)


  // const box: blessed.Widgets.BoxElement = grid.set(view.name==='file' ? [ 6, 0, 12 - offset, 6] : [ 0, 6, 12 - offset, 6], blessed.box, {
  //   height: '100%',
  //   width: '100%',
  //   label: 'Details',
  //   keys: true,
  //   mouse: true,
  //   draggable: true,
  //   clickable: true,
  //   left: 0,
  // } as blessed.Widgets.BoxOptions)

  const table = grid.set(...(view.name==='file' ?  [ 0, 6, 12 - offset, 6] : [ 6, 0, 12 - offset, 6]) ,contrib.table, {

  // const table = contrib.table({
    // ...scrollableOptions,// HEADS UP : THis break its
    clickable: true,
    keys: true,
    focusable: true, 
    draggable: true,
    mouse: true,
    height: '33%',
    top: 0,
    padding: 1,
    border: 'line',
    columnWidth: [8, 30],
    label: 'Selection',
    data: { headers: ['Property', 'Value'], data: [[]] }
  } )
  // box.append(table)
  
  let value : blessed.Widgets.ScrollableTextElement|undefined

  if(store.state.currentView!=='code'){
    // value = blessed.scrollabletext({
      // grid.set(view.name==='file' ?  [ 5, 6, 12 - offset, 8]: [ 8, 0, 12 - offset, 6] ,contrib.table, {
    value=    grid.set(...[ 5, 6, 12 - offset, 8] ,blessed.scrollabletext, {

      ...scrollableOptions,
      label: 'Full Value',
      width: '100%',
      top: '33%',
      height: '33%',
      padding: 1,
    draggable: true,
    border: 'line'
    })
    // box.prepend(value)
  }
  
  const actions = buildNodeActions(store)
    // const updateValueAndTableAfterNodeSelected: ActionListener<ActionType.NODE_SELECTION> = {
    //   listenerType: ActionListenerType.afterWrite,
    //   actionType: ActionType.NODE_SELECTION,
    //   handle(a, s){
    //     if(value){
    //                 value.setContent(isNode(a.node) ? a.node.getFullText() : '')
    //     }
    //     const data = [
    //       ['Kind', getGeneralNodeKindName(a.node) || ''],
    //       ['Name', getGeneralNodeName(a.node) || ''],
    //       ['Position', isNode(a.node) ? a.node.getPos() + '' : ''],
    //       ['Path', getGeneralNodePath(a.node, pwd()) || ''],
    //       [
    //         'Text',
    //         isNode(a.node)
    //           ? a.node
    //               .getFullText()
    //               .substring(0, Math.max(a.node.getFullText().length, 200))
    //               .replace(/\n/gm, '\\n') || ''
    //           : ''
    //       ]
    //     ]
    //   table.setData({ headers: ['Property', 'Value'], data })

    //   }
    // }
    store.addActionListener({
      listenerType: ActionListenerType.afterWrite,
      actionType: ActionType.NODE_SELECTION,
      id: ACTION_LISTENER.updateDetailsViewOnNodeSelection,
      handle(a, s){
        if(value){
                    value.setContent(isNode(a.node) ? a.node.getFullText() : '')
        }
        const data = [
          ['Kind', getGeneralNodeKindName(a.node) || ''],
          ['Name', getGeneralNodeName(a.node) || ''],
          ['Position', isNode(a.node) ? a.node.getPos() + '' : ''],
          ['Path', getGeneralNodePath(a.node, pwd()) || ''],
          [
            'Text',
            isNode(a.node)
              ? a.node
                  .getFullText()
                  .substring(0, Math.max(a.node.getFullText().length, 200))
                  .replace(/\n/gm, '\\n') || ''
              : ''
          ]
        ]
      table.setData({ headers: ['Property', 'Value'], data })

      }
    })


    // ;[table.rows, ...table.rows.children].filter(isBlessedElement).forEach(c =>
    //   c.key('enter', () => {
    //     if (table.rows.selected) {
    //       showInModal(screen, 'Disabled temporarily')
    //       // const node = getLastTableData()
    //       // const selected = data && data[table.rows.selected]
    //       // if (selected && selected[1]&& value) {
    //         // value.setContent(isNode(node) ? node.getFullText() : '')
    //         // screen.render()
    //       // }
    //     }
    //   })
    // )
  
  return  { table, actions,value}
}
