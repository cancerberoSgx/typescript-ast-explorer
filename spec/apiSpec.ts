import { blessed, Screen } from 'accursed'
import { Project } from 'ts-morph'
import { ProjectView } from '../src/api'
import { expectScreenNotToContain, expectScreenToContain } from './testUtil'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000

describe('apiSpec', () => {
  let screen: Screen
  beforeEach(() => {
    screen = blessed.screen({})
  })
  afterEach(destroy)
  afterAll(destroy)
  function destroy() {
    screen.program.clear()
    screen.program.reset()
    screen.destroy()
  }

  it('ProjectView', async done => {
    const project = new Project({ tsConfigFilePath: 'spec/assets/project1/tsconfig.json' })
    const labels = ['Project View', 'src', 'c:children', 'h:Help']
    expectScreenNotToContain(screen, labels)
    const v = new ProjectView({ project, screen, dontInstallExitKeys: false })
    v.render()
    expectScreenToContain(screen, labels)
    done()

    // screen.program.alternateBuffer();
    // screen.program.write(k.CURSOR_DOWN)
    // screen.input.write(k.CURSOR_DOWN)
    // screen.input.
    // screen.program.write(  screen.program.tput.key_down())
    // screen.emit('key down', undefined, { name: 'down' })
    // v.views.tree.emit('key down', undefined, { name: 'down' })
    // v.views.tree.emit('key down')
    // screen.program.tput.cursor_down(1)
    // screen.program.flush()
    // await sleep(1400)
    // screen.emit('key enter')
    // v.views.tree.emit('key enter', undefined, { name: 'enter' })
    // v.views.tree.emit('key enter', '\n', { name: 'enter' })

    // screen.program.tput.key_up()
    // screen.program.flush()
    // screen.input.write(k.CURSOR_DOWN)

    // await sleep(1400)

    // screen.input.write(k.CURSOR_DOWN)

    // console.log('***\n', screen.lines.map(l=>l.map(s=>s[1]).join()).join('\n'), '\n***');
    // await sleep(1200)

  })
})


