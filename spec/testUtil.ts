import { blessed, Screen } from 'accursed'
import { appendFileSync } from 'fs'
import { asArray } from 'misc-utils-of-mine-generic'

export function dumpScreen(screen: blessed.Widgets.Screen, debug = true) {
  const d = screen.lines ? screen.lines.map(l => l.map(s => s[1] + '').join('')).join('\n') + '' : ''
  debug && appendFileSync('tmp.txt', '\n\n***\n' + d)
  return d
}

export function expectScreenToContain(s: Screen, a: string | string[]) {
  const d = dumpScreen(s)
  asArray(a).forEach(s => expect(d).toContain(s, s))
}

export function expectScreenNotToContain(s: Screen, a: string | string[]) {
  const d = dumpScreen(s)
  asArray(a).forEach(s => expect(d).not.toContain(s, s))
}
