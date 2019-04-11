import { buildNodeActions } from './nodeActions';
import { isBlessedElement } from './util/blessed';
import { scrollableOptions } from './util/common';
import * as contrib from 'blessed-contrib'
import * as blessed from 'blessed'

export function buildDetails(grid: contrib.grid, screen: blessed.Widgets.Screen, offset: number, getLastTableData: () => string[][] | undefined) {
  const box: blessed.Widgets.BoxElement = grid.set(0, 6, 12 - offset, 6, blessed.box, {
    height: '100%',
    width: '100%',
    label: 'Details',
    keys: true,
    mouse: true,
    clickable: true,
    // parent: screen,
    // keys: true,
    left: 0,
    // top: 0,
    // width: 30,
    // height: 4,
    // bg: 'green',
    content: 'Submit or cancel?'
  } as blessed.Widgets.BoxOptions);
  const table = contrib.table({
    // ...scrollableOptions,// HEADS UP : THis break its
    clickable: true,
    keys: true,
    focusable: true,
    mouse: true,
    height: '32%',
    top: '0%',
    padding: 1,
    border: 'line',
    columnWidth: [8, 30],
    label: 'Selection',
    data: { headers: ['Property', 'Value'], data: [[]] },
  } as contrib.Widgets.TableOptions);
  box.append(table);
  [table.rows, ...table.rows.children].filter(isBlessedElement).forEach(c => c.key('enter', () => {
    if (table.rows.selected) {
      const data = getLastTableData();
      const selected = data && data[table.rows.selected];
      if (selected && selected[1]) {
        value.setContent(selected[1]);
        screen.render();
      }
    }
  }));
  const value = blessed.scrollabletext({
    ...scrollableOptions,
    label: 'Value',
    width: '100%',
    top: '33%',
    height: '33%',
    padding: 1,
    border: 'line',
  });
  box.prepend(value);
  const actions = buildNodeActions(screen, box);
  // box.append(actions)
  return { box, table, actions, value };
}
