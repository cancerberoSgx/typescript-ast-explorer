import { Element } from '../blessedTypes'

/**
 * Very simple abstract Component class (like React.Component) but without life cycle methods, or Refs. Has a dummy state that will update the blessed element if changed by default
 */
export abstract class Component<P = {}, S = {}> {
  constructor(protected props: P, protected state: S) {}

  abstract render(): JSX.ReactNode

  /**
   * All class elements will have a reference to its rendered blessed element
   */

  protected blessedElement: Element = undefined as any

  /** subclasses can override to prevent the blessed element to be rendered when the state changes */
  protected dontRenderOnStateChange = false

  /**
   * Dummy state, by default calls element's render() unless [[dontRenderOnStateChange]]
   */
  protected setState(s: Partial<S>) {
    this.state = { ...this.state, ...s }
    if (!this.dontRenderOnStateChange) {
      this.blessedElement.render()
    }
  }
}
