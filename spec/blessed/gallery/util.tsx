import { randomIntBetween } from 'misc-utils-of-mine-generic'
import { BoxOptions } from '../../../src/blessed/blessedTypes'

export const commonOptions: BoxOptions = {
  style: {
    bg: 'gray',
    fg: 'black'
  },
  // mouse: true,
  // clickable: true,
  // keys: true,
  // keyable: true
}
export function number(a = 0, b = 10) {
  return randomIntBetween(a, b)
}
export function color() {
  const colors = ['red', 'blue', 'cyan', 'green', 'magenta', 'yellow', 'brown']
  return colors[randomIntBetween(0, colors.length - 1)]
}
