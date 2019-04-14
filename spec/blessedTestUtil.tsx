import * as blessed from 'blessed'
import { installExitKeys } from '../src/blessed/blessed'
import { Element, Screen } from '../src/blessed/blessedTypes'
import { React } from '../src/blessed/jsx/createElement'

export function testJsx({
  creator,
  assert
}: {
  creator: (screen: Screen) => JSX.Element
  assert: (e: Element) => void
}) {
  const screen = blessed.screen({ smartCSR: true })
  installExitKeys(screen)
  const el = creator(screen)
  const a = React.render(el)
  a.on('render', () => {
    assert(a)
    screen!.destroy()
  })
  screen.render()
}
