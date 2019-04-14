import { Element, Style, BlessedElementOptionsIntersection, BoxOptions, WidgetTypesEnum } from '../blessedTypes'
import { RemoveProperties } from '../../util/misc';

/**
 * Very simple abstract Component class (like React.Component) but without life cycle methods, or Refs. Has a dummy state that will update the blessed element if changed by default
 */
export abstract class Component<P = {}, S = {}> {

  constructor(protected props: P, protected state: S) {}

  abstract render(): JSX.BlessedJsxNode

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




/** esthetic options like color font styles that doesn't change the postiion dimention at all ! (so they can me safely applied in a general manner (declared in a theme)) safely*/
// type VisualNoPositionImpactOptions =TextStyleOptions| 'ColorOptions' EventEStyleOptions ?

interface ComponentWithOptionsProps extends Style , RemoveProperties<BlessedElementOptionsIntersection, 'border'|'scrollbar'> {
  
}
/** inheriting from this abstract component wil give the change to all components of an app to share and extends  the same option semantics, mostly for style coherence. TODO: in the future use advanced theme framework css in jss, etc */
export abstract class ComponentWithOptions<P extends ComponentWithOptionsProps = {}, S = {}> extends Component<P, S>{
  /** subclasses */
// abstract elementType: ElementType
// protected style: Partial<Style>
// protected visualOptions: Partial<Style>

}