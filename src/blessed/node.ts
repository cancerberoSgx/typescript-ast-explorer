import { Node } from './blessedTypes'

type Visitor<T extends Node = Node> = (n: T) => boolean
interface VisitorOptions {
  childrenFirst?: boolean
  // if a descendant visitor returned true, we stop visiting and signal up
  breakOnDescendantSignal?: boolean
  // no matter if visitor returns true for a node, it will still visit its descendants and then break the chain
  visitDescendantsOnSelfSignalAnyway?: boolean
}

export function visitDescendants(n: Node, v: Visitor, o: VisitorOptions = {}): boolean {
  let r = false
  if (o.childrenFirst) {
    r = n.children.some(c => visitDescendants(c, v, o))
    if (!o.breakOnDescendantSignal && r) {
      return v(n)
    } else {
      return true
    }
  } else {
    r = v(n)
    if (r) {
      if (!o.visitDescendantsOnSelfSignalAnyway) {
        return true
      } else {
        return n.children.some(c => visitDescendants(c, v, o)) || true // true because self was signaled
      }
    } else {
      return n.children.some(c => visitDescendants(c, v, o))
    }
  }
}

type Predicate = (n: Node) => boolean

export function filter<T extends Node = Node>(n: Node, p: Predicate, o: VisitorOptions = {}): T[] {
  const a: T[] = []
  visitDescendants(n, c => {
    if (p(c)) {
      a.push(c as T)
    }
    return false
  })
  return a
}

export function find<T extends Node = Node>(n: Node, p: Predicate, o: VisitorOptions = {}) {
  let a: T | undefined
  visitDescendants(n, c => {
    if (p(c)) {
      a = c as T
      return true
    }
    return false
  })
  return a
}
