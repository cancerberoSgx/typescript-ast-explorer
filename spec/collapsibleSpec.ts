import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'
import { installExitKeys, onValueChange } from '../src/blessed/blessed'
import { BoxOptions, Screen, Markdown } from '../src/blessed/blessedTypes'
import { installCollapsible, toggleCollapsed, uninstallCollapsible } from '../src/blessed/collapsible'
import { renderer } from '../src/blessed/layoutRenderer'
import { testElement } from './blessedTestUtil';
import { find } from '../src/blessed/node';
import { screen } from 'blessed';
import { strip } from '../src/util/misc';

describe('collapsible', () => {
  it('should allow zero configuration with auto property', async done => {

    const markdown = `# Notes
    This text should collapse
    when the collapsible checkbox above is clicked
    and reappear when clicked again
    what they call toggle...`
    const checkboxOptions: BoxOptions = {
      input: true,
      mouse: true,
      clickable: true,
      focusable: true
    }
    testElement({
      creator(screen: Screen) {
        const layout = blessed.layout({
          ...checkboxOptions,
          parent: screen,
          top: '0%',
          left: '0%',
          width: '100%',
          height: '100%',
          border: 'line',
        })
      installCollapsible(layout, { auto: true })
         contrib.markdown({
          ...checkboxOptions,
          parent: layout,
          markdown
        })
        return layout
      },
      assert(e) {
        // e.screen.log('hs khsdfjkh')
        // e.screen.log('hs khsdfjkh')
        // e.screen.log('hs khsdfjkh')
        // e.screen.log('hs khsdfjkh')
        // console.log(find<Markdown>(e, c => c.type === 'markdown')!);   
        // e.screen.log('hshshshs\n\n\nsdkjhjhksdfjhksfdjhksdfjkhsdfjkh')
        const el = find<Markdown>(e, c => c.type === 'markdown')!
        // e.screen.log('heleehkekhke', el && el.getContent())
        markdown.split('\n').map(s=>strip(s).trim()).forEach(l=>{
          expect(el.getContent()).toContain(l)
        })
        // console.log(find<Markdown>(e, c => c.type === 'markdown')!.getContent())
        // expect(find<Markdown>(e, c => c.type === 'markdown')!.getContent()).toContain('when the collapsible checkbox above')
        // console.log(find<Textbox>(e, c => isElement<Textbox>(c) && c.secret)!.getContent());
        // expect(find<Textbox>(e, c => isElement<Textbox>(c) && c.secret)!.getContent()).toContain('helelele')
        // done()
      }
    })
  })
})



// const screen = blessed.screen({ smartCSR: true, log: './log.txt' })

// function creator

// creator(screen)