export * from 'misc-utils-of-mine-generic'

/**
 * return the Enum type from given string enum key obtained with key [[enumNoValueKeys]]
 */
export function enumValueFromString<T>(key: string, anEnum: any): T | undefined {
  return anEnum[key]
}
import { Element, isBlessedElement, Node, visitDescendants } from 'accursed'

export function visitDescendantElements(node: Node, fn: (l: Element) => boolean) {
  return visitDescendants(node, n => (isBlessedElement(n) ? fn(n) : false))
}
