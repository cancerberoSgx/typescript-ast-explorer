import { Textarea } from '../src/blessed/blessedTypes'
import { React } from '../src/blessed/jsx/createElement'
import { find } from '../src/blessed/node'
import { testJsx } from './blessedTestUtil'

describe('blessed node', () => {
  it('should find and filter', async done => {
    testJsx({
      creator: screen => (
        <box parent={screen}>
          hello <textbox secret={true} content="helelele" />
          <button content="button123" />
        </box>
      ),
      assert: e => {
        expect(find<Textarea>(e, c => c.type === 'button')!.getContent()).toContain('button123')
        // console.log(find<Textbox>(e, c => isElement<Textbox>(c) && c.secret)!.getContent());

        // expect(find<Textbox>(e, c => isElement<Textbox>(c) && c.secret)!.getContent()).toContain('helelele')
        done()
      }
    })
  })
})

// function isBlessedElement<T extends Element>(a: any): a is T{
// return true
// }
