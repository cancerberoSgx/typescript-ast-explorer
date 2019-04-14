// Type definitions for blessed 0.1
// Project: https://github.com/chjj/blessed
// Definitions by: Bryn Austin Bellomy <https://github.com/brynbellomy>
//                 Steve Kellock <https://github.com/skellock>
//                 Max Brauer <https://github.com/mamachanko>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
// TypeScript Version: 2.1

/// <reference types="node" />

import * as child_process from 'child_process';
import { EventEmitter } from 'events';
import * as stream from 'stream';
import { Readable, Writable } from 'stream';

export interface IBlessedProgramOptions {
  input?: Readable
  output?: Writable
  /** path to a file where to write when screen.log() or program.log are called */
  log?: string
  dump?: boolean
  /** zero-based indexes for col, row values */
  zero?: boolean
  buffer?: boolean
  terminal?: string
  term?: string
  tput?: string
  debug?: boolean
  resizeTimeout?: boolean
}

export class BlessedProgram extends EventEmitter {
  type: string
  options: IBlessedProgramOptions
  input: Readable
  output: Writable
   /** zero-based indexes for col, row values */
  zero: boolean
  useBuffer: boolean
  x: number
  y: number
  savedX: number
  savedY: number
  cols: number
  rows: number
  scrollTop: number
  scrollBottom: number
  isOSXTerm: boolean
  isiTerm2: boolean
  isXFCE: boolean
  isTerminator: boolean
  isLXDE: boolean
  isVTE: boolean
  isRxvt: boolean
  isXterm: boolean
  tmux: boolean
  tmuxVersion: number
  isAlt: boolean

  constructor(options?: IBlessedProgramOptions)
/** writes arguments to [[log]] file passed in options*/
  log(...args: any[]): boolean
  debug(s: string): boolean
  setupDump(): void
  setupTput(): void
  setTerminal(terminal: string): void
  /** Queries whether the terminal has the capability `name`. */
  has(name: string): boolean
  /** 	Queries whether the terminal of the type `is`. */
  term(is: string): boolean

  listen(): void
  destroy(): void

  key(key: string | string[], l: Widgets.KeyEventListener): void
  onceKey(key: string | string[], l: Widgets.KeyEventListener): void

  unKey(key: string | string[], l: Widgets.KeyEventListener): void
  removeKey(key: string | string[], l: Widgets.KeyEventListener): void

  bindMouse(): void
  enableGpm(): void
  disableGpm(): void
  bindResponse(): void

  response(name: string, text: string, callback: Function, noBypass?: boolean): boolean
  response(name: string, callback?: Function): boolean

  write(text: string): boolean
  /**
   * Writes to this.output
   * Example: `program.write('Hello world', 'blue fg')`
   */
  write(text: string, style: string): boolean
/**
 * 	Flushes the buffer.
 */
  flush(): void 
  /** 	Determines whether to include text attributes when writing. */
  print(text: string, attr?: boolean): boolean
  echo(text: string, attr?: boolean): boolean
/** sets cursor  */
  setx(x: number): boolean
  sety(y: number): boolean
  move(x: number, y: number): boolean
  omove(x: number, y: number): void
  rsetx(x: number): boolean
  rsety(y: number): boolean
  rmove(x: number, y: number): void
  cursorCharAbsolute(x:number): number

  simpleInsert(ch: string, i?: number, attr?: boolean): boolean
  repeat(ch: string, i?: number): string
  copyToClipboard(text: string): boolean

  cursorShape(shape: string, blink?: boolean): boolean
  cursorColor(color: string): boolean
  cursorReset(): boolean
  resetCursor(): boolean

  getTextParams(param: string, callback: Function): boolean
  getCursorColor(callback: Function): boolean

  nul(): boolean

  bell(): boolean
  bel(): boolean

  vtab(): boolean

  form(): boolean
  ff(): boolean

  backspace(): boolean
  kbs(): boolean

  tab(): boolean
  ht(): boolean
  /** @internal  */
  _ncoords(): void
  shiftOut(): boolean
  shiftIn(): boolean

  return(): boolean
  cr(): boolean

  feed(): boolean
  newline(): boolean
  nl(): boolean

  index(): boolean
  ind(): boolean

  reverseIndex(): boolean
  reverse(): boolean
  ri(): boolean

  nextLine(): boolean
  reset(): boolean
  tabSet(): boolean

  saveCursor(key: string): boolean
  sc(key: string): boolean

  restoreCursor(key?: string, hide?: boolean): boolean
  rc(key?: string, hide?: boolean): boolean

  lsaveCursor(key?: string): void
  lrestoreCursor(key?: string, hide?: boolean): void

  lineHeight(): boolean

  charset(val?: string, level?: number): boolean

  enter_alt_charset_mode(): boolean
  as(): boolean
  smacs(): boolean

  exit_alt_charset_mode(): boolean
  ae(): boolean
  rmacs(): boolean

  setG(val: number): boolean

  setTitle(title: string): boolean

  resetColors(param?: string): boolean

  dynamicColors(param?: string): boolean

  selData(a: string, b: string): boolean

  cursorUp(param?: number): boolean
  cuu(param?: number): boolean
  up(param?: number): boolean

  cursorDown(param?: number): boolean
  cud(param?: number): boolean
  down(param?: number): boolean

  cursorForward(param?: number): boolean
  cuf(param?: number): boolean
  right(param?: number): boolean
  forward(param?: number): boolean

  cursorBackward(param?: number): boolean
  cub(param?: number): boolean
  left(param?: number): boolean
  back(param?: number): boolean

  cursorPos(row?: number, col?: number): boolean
  cup(row?: number, col?: number): boolean
  pos(row?: number, col?: number): boolean

  eraseInDisplay(param?: string): boolean
  ed(param?: string): boolean

  clear(): boolean

  eraseInLine(param?: string): boolean
  el(param?: string): boolean

  charAttributes(param: string, val?: boolean): boolean
  charAttributes(param: string[], val?: boolean): boolean

  setForeground(color: string, val?: boolean): boolean
  fg(color: string, val?: boolean): boolean

  setBackground(color: string, val?: boolean): boolean
  bg(color: string, val?: boolean): boolean

  deviceStatuses(param?: string, callback?: Function, dec?: boolean, noBypass?: boolean): boolean
  dsr(param?: string, callback?: Function, dec?: boolean, noBypass?: boolean): boolean

  getCursor(callback: (err: Error, data: IMouseEventArg) => any): boolean
  saveReportedCursor(callback: Function): void

  restoreReportedCursor: () => boolean
/** CSI Ps @
Insert Ps (Blank) Character(s) (default = 1) (ICH). */
  insertChars(param?: number): boolean
  ich(param?: number): boolean

  cursorNextLine(param?: number): boolean
  cnl(param?: number): boolean

  cursorPrecedingLine(param?: number): boolean
  cpl(param?: number): boolean

  cursorCharAbsolute(param?: number): boolean
  cha(param?: number): boolean

  insertLines(param?: number): boolean
  il(param?: number): boolean

  deleteLines(param?: number): boolean
  dl(param?: number): boolean

  deleteChars(param?: number): boolean
  dch(param?: number): boolean

  eraseChars(param?: number): boolean
  ech(param?: number): boolean

  charPosAbsolute(param?: number): boolean
  hpa(param?: number): boolean

  HPositionRelative(param?: number): boolean

  sendDeviceAttributes(param?: number, callback?: Function): boolean
  da(param?: number, callback?: Function): boolean

  linePosAbsolute(param?: number): boolean
  vpa(param?: number): boolean

  VPositionRelative(param?: number): boolean
  vpr(param?: number): boolean

  HVPosition(row?: number, col?: number): boolean
  hvp(row?: number, col?: number): boolean

  setMode(...args: string[]): boolean
  sm(...args: string[]): boolean

  decset(...args: string[]): boolean

  showCursor(): boolean

  alternateBuffer(): boolean
  smcup(): boolean
  alternate(): boolean

  resetMode(...args: string[]): boolean
  rm(...args: string[]): boolean

  decrst(...args: string[]): boolean

  hideCursor(): boolean
  civis(): boolean
  vi(): boolean
  cursor_invisible(): boolean
  dectcemh(): boolean

  normalBuffer(): boolean
  rmcup(): boolean

  enableMouse(): void
  disableMouse(): void

  setMouse(opt?: {}, enable?: boolean): void

  setScrollRegion(top: number, bottom: number): boolean
  csr(top: number, bottom: number): boolean
  decstbm(top: number, bottom: number): boolean

  saveCursorA(): boolean
  scA(): boolean

  restoreCursorA(): boolean
  rcA(): boolean
/**  Cursor Forward Tabulation Ps tab stops (default = 1) (CHT). */
  cursorForwardTab(param?: number): boolean
  cht(param?: number): boolean
/**CSI Ps S  Scroll up Ps lines (default = 1) (SU). */
  scrollUp(param?: number): boolean
  su(param?: number): boolean
/**  CSI Ps T  Scroll down Ps lines (default = 1) (SD). */
  scrollDown(param?: number): boolean
  sd(param?: number): boolean
/** CSI Ps ; Ps ; Ps ; Ps ; Ps T
//   Initiate highlight mouse tracking.  Parameters are
//   [func;startx;starty;firstrow;lastrow].  See the section Mouse
//   Tracking. */
  initMouseTracking(...args: string[]): boolean
/**
 * CSI > Ps; Ps T
  Reset one or more features of the title modes to the default
  value.  Normally, "reset" disables the feature.  It is possi-
  ble to disable the ability to reset features by compiling a
  different default for the title modes into xterm.
    Ps = 0  -> Do not set window/icon labels using hexadecimal.
    Ps = 1  -> Do not query window/icon labels using hexadeci-
    mal.
    Ps = 2  -> Do not set window/icon labels using UTF-8.
    Ps = 3  -> Do not query window/icon labels using UTF-8.
  (See discussion of "Title Modes").
 */
  resetTitleModes(...args: string[]): boolean

  /**  CSI Ps Z  Cursor Backward Tabulation Ps tab stops (default = 1) (CBT). */
  cursorBackwardTab(param?: number): boolean
  cbt(param?: number): boolean

  repeatPrecedingCharacter(param?: number): boolean
  rep(param?: number): boolean

  tabClear(param?: number): boolean
  tbc(param?: number): boolean

  mediaCopy(...args: string[]): boolean
  mc(...args: string[]): boolean

  mc0(): boolean
  print_screen(): boolean
  ps(): boolean

  mc5(): boolean
  prtr_on(): boolean
  po(): boolean

  mc4(): boolean
  prtr_off(): boolean
  pf(): boolean

  mc5p(): boolean
  prtr_non(): boolean
  p0(): boolean

  setResources(...args: string[]): boolean

  disableModifieres(...args: string[]): boolean

  /** CSI > Ps p
Set resource value pointerMode.  This is used by xterm to
decide whether to hide the pointer cursor as the user types.
Valid values for the parameter:
  Ps = 0  -> never hide the pointer.
  Ps = 1  -> hide if the mouse tracking mode is not enabled.
  Ps = 2  -> always hide the pointer.  If no parameter is
  given, xterm uses the default, which is 1 . */
  setPointerMode(...args: string[]): boolean

  softReset(): boolean
  rs2(): boolean
  decstr(): boolean

  requestAnsiMode(param?: number): boolean
  decrqm(param?: number): boolean

  requestPrivateMode(param?: number): boolean
  decrqmp(param?: number): boolean

  setConformanceLevel(...args: string[]): boolean
  decscl(...args: string[]): boolean

  loadLEDs(param?: number): boolean
  decll(param?: number): boolean

  /** 
   * CSI Ps SP q
Set cursor style (DECSCUSR, VT520).
 Ps = 0  -> blinking block.
 Ps = 1  -> blinking block (default).
 Ps = 2  -> steady block.
 Ps = 3  -> blinking underline.
 Ps = 4  -> steady underline.
   */
  setCursorStyle(param?: string): boolean
  decscursr(param?: string): boolean

  /**
   * CSI Ps " q
  Select character protection attribute (DECSCA).  Valid values
  for the parameter:
    Ps = 0  -> DECSED and DECSEL can erase (default).
    Ps = 1  -> DECSED and DECSEL cannot erase.
    Ps = 2  -> DECSED and DECSEL can erase.
   */
  setCharProtectionAttr(param?: number): boolean
  decsca(param?: number): boolean
/**
CSI ? Pm r
  Restore DEC Private Mode Values.  The value of Ps previously
  saved is restored.  Ps values are the same as for DECSET. */
  restorePrivateValues(...args: string[]): boolean

  /**
   * CSI Pt; Pl; Pb; Pr; Ps$ r
  Change Attributes in Rectangular Area (DECCARA), VT400 and up.
    Pt; Pl; Pb; Pr denotes the rectangle.
    Ps denotes the SGR attributes to change: 0, 1, 4, 5, 7.
NOTE: xterm doesn't enable this code by default.
   */
  setAttrInRectangle(Pt: number, Pl: number, Pb: number ,Pr: number, Ps$: number): boolean
  deccara(...args: string[]): boolean

  /**  Save DEC Private Mode Values.  Ps values are the same as for */
  savePrivateValues(...args: string[]): boolean

  manipulateWindow(...args: any[]): boolean

  getWindowSize(callback?: Function): boolean

  reverseAttrInRectangle(...args: string[]): boolean
  decrara(...args: string[]): boolean

  setTitleModeFeature(...args: string[]): boolean

  setWarningBellVolume(param?: number): boolean
  decswbv(param?: number): boolean

  setMarginBellVolume(param?: number): boolean

  copyRectangle(...args: string[]): boolean
  deccra(...args: string[]): boolean

  enableFilterRectangle(...args: string[]): boolean
  decefr(...args: string[]): boolean

  requestParameters(param?: number): boolean
  decreqtparm(param: number): boolean
/**
 * CSI Ps x  Select Attribute Change Extent (DECSACE).
    Ps = 0  -> from start to end position, wrapped.
    Ps = 1  -> from start to end position, wrapped.
    Ps = 2  -> rectangle (exact).
 */
  selectChangeExtent(param?: number): boolean
  decsace(param?: number): boolean

  /**
    CSI Pc; Pt; Pl; Pb; Pr$ x
  Fill Rectangular Area (DECFRA), VT420 and up.
    Pc is the character to use.
    Pt; Pl; Pb; Pr denotes the rectangle.
NOTE: xterm doesn't enable this code by default.
   */
  fillRectangle(Pc: string, Pt: number, pl: number, pb: number, pr: number): boolean
  /** same as fillRectangle */
  decfra(...args: string[]): boolean

  enableLocatorReporting(...args: string[]): boolean
  decelr(...args: string[]): boolean

  eraseRectangle(...args: string[]): boolean
  decera(...args: string[]): boolean

  setLocatorEvents(...args: string[]): boolean
  decsle(...args: string[]): boolean

  selectiveEraseRectangle(...args: string[]): boolean
  decsera(...args: string[]): boolean
/**
 *  CSI Ps ' |
   Request Locator Position (DECRQLP).
   Valid values for the parameter are:
     Ps = 0 , 1 or omitted -> transmit a single DECLRP locator
     report.

   If Locator Reporting has been enabled by a DECELR, xterm will
   respond with a DECLRP Locator Report.  This report is also
   generated on button up and down events if they have been
   enabled with a DECSLE, or when the locator is detected outside
   of a filter rectangle, if filter rectangles have been enabled
   with a DECEFR.

     -> CSI Pe ; Pb ; Pr ; Pc ; Pp &  w

   Parameters are [event;button;row;column;page].
   Valid values for the event:
     Pe = 0  -> locator unavailable - no other parameters sent.
     Pe = 1  -> request - xterm received a DECRQLP.
     Pe = 2  -> left button down.
     Pe = 3  -> left button up.
     Pe = 4  -> middle button down.
     Pe = 5  -> middle button up.
     Pe = 6  -> right button down.
     Pe = 7  -> right button up.
     Pe = 8  -> M4 button down.
     Pe = 9  -> M4 button up.
     Pe = 1 0  -> locator outside filter rectangle.
   ``button'' parameter is a bitmask indicating which buttons are
     pressed:
     Pb = 0  <- no buttons down.
     Pb & 1  <- right button down.
     Pb & 2  <- middle button down.
     Pb & 4  <- left button down.
     Pb & 8  <- M4 button down.
   ``row'' and ``column'' parameters are the coordinates of the
     locator position in the xterm window, encoded as ASCII deci-
     mal.
   The ``page'' parameter is not used by xterm, and will be omit-
   ted.

 */
  requestLocatorPosition(param?: string, callback?: Function): boolean
  /** requestLocatorPosition */
  reqmp(param?: string, callback?: Function): boolean
   /** requestLocatorPosition */
  req_mouse_pos(param?: string, callback?: Function): boolean
   /** requestLocatorPosition */
  decrqlp(param?: string, callback?: Function): boolean

  /** 
 CSI P m SP }
 Insert P s Column(s) (default = 1) (DECIC), VT420 and up.
 NOTE: xterm doesn't enable this code by default. */
  insertColumns(...args: string[]): boolean
  decic(...args: string[]): boolean

  deleteColumns(...args: string[]): boolean
  decdc(...args: string[]): boolean

  out(param: string, ...args: any[]): boolean

  sigtstp(callback?: Function): boolean

  pause(callback?: Function): Function

  resume: () => void
}

export namespace Widgets {
  export namespace Types {
    type TTopLeft = string | number | 'center'

    type TPosition = string | number

    type TMouseAction = 'mousedown' | 'mouseup' | 'mousemove'

    interface TBorder extends TStyle {
      /** Type of border (line or bg). bg by default. */
      type?: BorderType

      /** Character to use if bg type, default is space.   */
      ch?: string

      top?: boolean
      left?: boolean
      right?: boolean
      bottom?: boolean
    }
    export interface TStyle {
      /** artificial type for user custom data (it doesn't exists just a type) */
      custom?: any

      // leave it open for custom style properties
      // [name: string]: any
      bg?: Color
      fg?: Color
      bold?: boolean
      underline?: boolean
      blink?: boolean
      inverse?: boolean
      invisible?: boolean
      transparent?: boolean
      shadow?: boolean
      border?: TBorder | BorderType
      label?: string
      track?: TStyle
      scrollbar?: TStyle | true
      focus?: TStyle
      item?: TStyle
      selected?: TStyle
      hover?: TStyle

      //   /**
      //    * Type of border (line or bg). bg by default.
      //    */
      //   type?: BorderType

      //   /**
      //    * Character to use if bg type, default is space.
      //    */
      //   ch?: string

      //   /**
      //    * Border foreground and background, must be numbers (-1 for default).
      //    */
      //   bg?: number
      //   fg?: number

      //   /**
      //    * Border attributes.
      //    */
      //   bold?: boolean
      //   underline?: boolean

      //   top?: boolean
      //   left?: boolean
      //   right?: boolean
      //   bottom?: boolean
    }

    // interface TBorder {
    //   /**
    //    * Type of border (line or bg). bg by default.
    //    */
    //   type?: BorderType

    //   /**
    //    * Character to use if bg type, default is space.
    //    */
    //   ch?: string

    //   /**
    //    * Border foreground and background, must be numbers (-1 for default).
    //    */
    //   bg?: number
    //   fg?: number

    //   /**
    //    * Border attributes.
    //    */
    //   bold?: boolean
    //   underline?: boolean
    // }

    interface TCursor {
      /**
       * Have blessed draw a custom cursor and hide the terminal cursor (experimental).
       */
      artificial: boolean

      /**
       * Shape of the cursor. Can be: block, underline, or line.
       */
      shape: 'block' | 'underline' | 'line'

      /**
       * Whether the cursor blinks.
       */
      blink: boolean

      /**
       * Color of the color. Accepts any valid color value (null is default).
       */
      color: string
    }

    type TAlign = 'left' | 'center' | 'right'

    interface ListbarCommand {
      key?: string
      callback(): void
    }

    interface TImage {
      /**
       * Pixel width.
       */
      width: number

      /**
       * Pixel height.
       */
      height: number

      /**
       * Image bitmap.
       */
      bmp: any

      /**
       * Image cellmap (bitmap scaled down to cell size).
       */
      cellmap: any
    }

    interface Cursor {
      /**
       * Have blessed draw a custom cursor and hide the terminal cursor (experimental).
       */
      artificial: boolean

      /**
       * Shape of the cursor. Can be: block, underline, or line.
       */
      shape: boolean

      /**
       * Whether the cursor blinks.
       */
      blink: boolean

      /**
       * Color of the color. Accepts any valid color value (null is default).
       */
      color: string
    }
  }

  namespace Events {
    interface IMouseEventArg extends IAbstractEventArg {
      x: number
      y: number
      action: Types.TMouseAction
      button: 'left' | 'right' | 'middle' | 'unknown'
      name: 'mouse'
    }

    interface IKeyEventArg extends IAbstractEventArg {
      full: string
      sequence: string
    }

    interface IAbstractEventArg {
      name: string
      shift: boolean
      ctrl: boolean
      meta: boolean
      type: string
      raw: [number, number, number, string]
      bug: Buffer
    }

    interface INodeGenericEventArg extends PositionCoords {
      base: number
      renders: number
    }
  }

  interface NodeChildProcessExecOptions {
    cwd?: string
    stdio?: any
    customFds?: any
    env?: any
    encoding?: string
    timeout?: number
    maxBuffer?: number
    killSignal?: string
  }

  interface IDestroyable {
    destroy(): void
  }

  interface IOptions {}

  interface IHasOptions<T extends IOptions> {
    options: T
  }

  interface TputsOptions extends IOptions {
    terminal?: string
    extended?: boolean
    debug?: boolean
    termcap?: string
    terminfoFile?: string
    terminfoPrefix?: string
    termcapFile?: string
  }

  class Tput implements IHasOptions<TputsOptions> {
    constructor(opts: TputsOptions)

    /**
     * Original options object.
     */
    options: TputsOptions

    debug: boolean
    padding: boolean
    extended: boolean
    printf: boolean
    termcap: string
    terminfoPrefix: string
    terminfoFile: string
    termcapFile: string
    error: Error
    terminal: string

    setup(): void
    term(is: any): boolean
    readTerminfo(term: string): string
    parseTerminfo(
      data: any,
      file: string
    ): {
      header: {
        dataSize: number
        headerSize: number
        magicNumber: boolean
        namesSize: number
        boolCount: number
        numCount: number
        strCount: number
        strTableSize: number
        extended: {
          dataSize: number
          headerSize: number
          boolCount: number
          numCount: number
          strCount: number
          strTableSize: number
          lastStrTableOffset: number
        }
      }
      name: string
      names: string[]
      desc: string
      bools: any
      numbers: any
      strings: any
    }
  }

  interface IDestroyable {
    destroy(): void
  }

  interface INodeOptions extends IOptions {
    name?: string
    screen?: Screen
    parent?: Node
    // children?: Node[]
    focusable?: boolean
  }

  type NodeEventType =
    /** Received when node is added to a parent. */
    | 'adopt'
    /** Received when node is removed from it's current parent. */
    | 'remove'
    /** Received when node gains a new parent. */
    | 'reparent'
    /** Received when node is attached to the screen directly or somewhere in its ancestry. */
    | 'attach'
    /** Received when node is detached from the screen directly or somewhere in its ancestry. */
    | 'detach'

  abstract class Node extends EventEmitter implements IHasOptions<INodeOptions>, IDestroyable {
    constructor(options: INodeOptions)

    focusable: boolean

    /**
     * Original options object.
     */
    options: INodeOptions

    /**
     * An object for any miscellanous user data.
     */
    data: { [index: string]: any }

    /**
     * An object for any miscellanous user data.
     */
    _: { [index: string]: any }

    /**
     * An object for any miscellanous user data.
     */
    $: { [index: string]: any }

    /**
     * Type of the node (e.g. box).
     */
    type: string

    /**
     * Render index (document order index) of the last render call.
     */
    index: number

    /**
     * Parent screen.
     */
    screen: Screen

    /**
     * Parent node.
     */
    parent?: Node

    /**
     * Array of node's children.
     */
    children: Node[]

    /**
     * Prepend a node to this node's children.
     */
    prepend(node: Node): void

    /**
     * Append a node to this node's children.
     */
    append(node: Node): void

    /**
     * Remove child node from node.
     */
    remove(node: Node): void

    /**
     * Insert a node to this node's children at index i.
     */
    insert(node: Node, index: number): void

    /**
     * Insert a node to this node's children before the reference node.
     */
    insertBefore(node: Node, refNode: Node): void

    /**
     * Insert a node from node after the reference node.
     */
    insertAfter(node: Node, refNode: Node): void

    /**
     * Remove node from its parent.
     */
    detach(): void
    free(): void
    forDescendants(iter: (node: Node) => void, s: any): void
    forAncestors(iter: (node: Node) => void, s: any): void
    collectDescendants(s: any): void
    collectAncestors(s: any): void

    /**
     * Emit event for element, and recursively emit same event for all descendants.
     */
    emitDescendants(type?: string, ...args: any[]): void
    emitAncestors(): void
    hasDescendant<T extends Node = Node>(target: Node): Node
    hasAncestor<T extends Node = Node>(target: Node): Node
    destroy(): void

    /**
     * Get user property with a potential default value.
     */
    get<T>(name: string, def: T): T

    /**
     * Set user property to value.
     */
    set(name: string, value: any): void

    on(event: string, listener: (...args: any[]) => void): this
    on(event: NodeEventType, callback: (arg: Node) => void): this
  }

  type NodeScreenEventType =
    /**
     * Received when the terminal window focuses/blurs. Requires a terminal supporting the
     * focus protocol and focus needs to be passed to program.enableMouse().
     */
    | 'focus'
    /**
     * Received when the terminal window focuses/blurs. Requires a terminal supporting the
     * focus protocol and focus needs to be passed to program.enableMouse().
     */
    | 'blur'
    /**
     * Element was clicked (slightly smarter than mouseup).
     */
    | 'click'
    | 'element click'
    | 'element mouseover'
    | 'element mouseout'
    | 'element mouseup'

  type NodeMouseEventType =
    | 'mouse'
    | 'mouseout'
    | 'mouseover'
    | 'mousedown'
    | 'mouseup'
    | 'mousewheel'
    | 'wheeldown'
    | 'wheelup'
    | 'mousemove'
    | 'click'

  type NodeGenericEventType =
    /** Received on screen resize. */
    | 'resize'
    /** Received before render. */
    | 'prerender'
    /** Received on render. */
    | 'render'
    /** Received when the screen is destroyed (only useful when using multiple screens). */
    | 'destroy'
    /** Received when the element is moved. */
    | 'move'
    /** Received when element is shown. */
    | 'show'
    /** Received when element becomes hidden. */
    | 'hide'
    | 'set content'
    | 'parsed content'

  export type KeyEventListener = (ch: string, key: Events.IKeyEventArg) => void
  class NodeWithEvents extends Node {
    /**
     * Bind a keypress listener for a specific key.
     */
    key(name: string | string[], listener: KeyEventListener): void

    /**
     * Bind a keypress listener for a specific key once.
     */
    onceKey(name: string, listener: KeyEventListener): void

    /**
     * Remove a keypress listener for a specific key.
     */
    unkey(name: string, listener: KeyEventListener): void
    removeKey(name: string, listener: KeyEventListener): void

    on(event: string, listener: (...args: any[]) => void): this
    /** Received on mouse events. */
    on(event: NodeMouseEventType, callback: (arg: Events.IMouseEventArg) => void): this

    /** Received on key events. */
    on(event: 'keypress', callback: KeyEventListener): this
    on(event: NodeScreenEventType, callback: (arg: Screen) => void): this
    /** Received when blessed notices something untoward (output is not a tty, terminfo not found, etc). */
    on(event: 'warning', callback: (text: string) => void): this
    on(event: NodeGenericEventType, callback: (arg: Events.INodeGenericEventArg) => void): this
  }

  interface IScreenOptions extends INodeOptions {
    /**
     * The blessed Program to be associated with. Will be automatically instantiated if none is provided.
     */
    program?: BlessedProgram

    /**
     * Attempt to perform CSR optimization on all possible elements (not just full-width ones, elements with
     * uniform cells to their sides). This is known to cause flickering with elements that are not full-width,
     * however, it is more optimal for terminal rendering.
     */
    smartCSR?: boolean

    /**
     * Do CSR on any element within 20 cols of the screen edge on either side. Faster than smartCSR,
     * but may cause flickering depending on what is on each side of the element.
     */
    fastCSR?: boolean

    /**
     * Attempt to perform back_color_erase optimizations for terminals that support it. It will also work
     * with terminals that don't support it, but only on lines with the default background color. As it
     * stands with the current implementation, it's uncertain how much terminal performance this adds at
     * the cost of overhead within node.
     */
    useBCE?: boolean

    /**
     * Amount of time (in ms) to redraw the screen after the terminal is resized (Default: 300).
     */
    resizeTimeout?: number

    /**
     * The width of tabs within an element's content.
     */
    tabSize?: number

    /**
     * Automatically position child elements with border and padding in mind (NOTE: this is a recommended
     * option. It may become default in the future).
     */
    autoPadding?: boolean

    cursor?: Types.TCursor

    /**
     * Create a log file. See log method.
     */
    log?: string

    /**
     * Dump all output and input to desired file. Can be used together with log option if set as a boolean.
     */
    dump?: string | boolean

    /**
     * Debug mode. Enables usage of the debug method. Also creates a debug console which will display when
     * pressing F12. It will display all log and debug messages.
     */
    debug?: boolean

    /**
     * Instance of the debug console that is enabled when calling debug options is actuve and key f12 is pressed. 
     * Useful to programmatically access it in case keys don't wonk.
     * @internal
     */
    debugLog?: Log

    /**
     * Array of keys in their full format (e.g. C-c) to ignore when keys are locked or grabbed. Useful
     * for creating a key that will always exit no matter whether the keys are locked.
     */
    ignoreLocked?: boolean

    /**
     * Automatically "dock" borders with other elements instead of overlapping, depending on position
     * (experimental). For example: These border-overlapped elements:
     */
    dockBorders?: boolean

    /**
     * Normally, dockable borders will not dock if the colors or attributes are different. This option
     * will allow them to dock regardless. It may produce some odd looking multi-colored borders though.
     */
    ignoreDockContrast?: boolean

    /**
     * Allow for rendering of East Asian double-width characters, utf-16 surrogate pairs, and unicode
     * combining characters. This allows you to display text above the basic multilingual plane. This
     * is behind an option because it may affect performance slightly negatively. Without this option
     * enabled, all double-width, surrogate pair, and combining characters will be replaced by '??',
     * '?', '' respectively. (NOTE: iTerm2 cannot display combining characters properly. Blessed simply
     * removes them from an element's content if iTerm2 is detected).
     */
    fullUnicode?: boolean

    /**
     * Send focus events after mouse is enabled.
     */
    sendFocus?: boolean

    /**
     * Display warnings (such as the output not being a TTY, similar to ncurses).
     */
    warnings?: boolean

    /**
     * Force blessed to use unicode even if it is not detected via terminfo, env variables, or windows code page.
     * If value is true unicode is forced. If value is false non-unicode is forced (default: null).
     */
    forceUnicode?: boolean

    /**
     * Input and output streams. process.stdin/process.stdout by default, however, it could be a
     * net.Socket if you want to make a program that runs over telnet or something of that nature.
     */
    input?: stream.Writable

    /**
     * Input and output streams. process.stdin/process.stdout by default, however, it could be a
     * net.Socket if you want to make a program that runs over telnet or something of that nature.
     */
    output?: stream.Readable

    /**
     * The blessed Tput object (only available if you passed tput: true to the Program constructor.)
     */
    tput?: Tput

    /**
     * Top of the focus history stack.
     */
    focused?: BlessedElement

    /**
     * Width of the screen (same as program.cols).
     */
    width?: Types.TPosition

    /**
     * Height of the screen (same as program.rows).
     */
    height?: Types.TPosition

    /**
     * Same as screen.width.
     */
    cols?: number

    /**
     * Same as screen.height.
     */
    rows?: number

    /**
     * Relative top offset, always zero.
     */
    top?: Types.TTopLeft

    /**
     * Relative left offset, always zero.
     */
    left?: Types.TTopLeft

    /**
     * Relative right offset, always zero.
     */
    right?: Types.TPosition

    /**
     * Relative bottom offset, always zero.
     */
    bottom?: Types.TPosition

    /**
     * Absolute top offset, always zero.
     */
    atop?: Types.TTopLeft

    /**
     * Absolute left offset, always zero.
     */
    aleft?: Types.TTopLeft

    /**
     * Absolute right offset, always zero.
     */
    aright?: Types.TPosition

    /**
     * Absolute bottom offset, always zero.
     */
    abottom?: Types.TPosition

    /**
     * Whether the focused element grabs all keypresses.
     */
    grabKeys?: any

    /**
     * Prevent keypresses from being received by any element.
     */
    lockKeys?: boolean

    /**
     * The currently hovered element. Only set if mouse events are bound.
     */
    hover?: any

    /**
     * Set or get terminal name. Set calls screen.setTerminal() internally.
     */
    terminal?: string

    /**
     * Set or get window title.
     */
    title?: string
  }

  class Screen extends NodeWithEvents implements IHasOptions<IScreenOptions> {
    constructor(opts: IScreenOptions)

    /**  Parse the sides of an element to determine whether an element has uniform cells on both sides. If it does, we can use CSR to optimize scrolling on a scrollable element. Not exactly sure how worthwile this is. This will cause a performance/cpu-usage hit, but will it be less or greater than the performance hit of slow-rendering scrollable boxes with clean sides? */
    cleanSides(el: Element): boolean

    /** true is the terminal was destroyed. @internal.  */
    destroyed?: boolean

    /** focus history. @internal */
    history: BlessedElement[] 

    /**
     * Original options object.
     */
    options: IScreenOptions

    /**
     * The blessed Program to be associated with. Will be automatically instantiated if none is provided.
     */
    program: BlessedProgram

    /**
     * Attempt to perform CSR optimization on all possible elements (not just full-width ones, elements with
     * uniform cells to their sides). This is known to cause flickering with elements that are not full-width,
     * however, it is more optimal for terminal rendering.
     */
    smartCSR: boolean

    /**
     * Do CSR on any element within 20 cols of the screen edge on either side. Faster than smartCSR,
     * but may cause flickering depending on what is on each side of the element.
     */
    fastCSR: boolean

    /**
     * Attempt to perform back_color_erase optimizations for terminals that support it. It will also work
     * with terminals that don't support it, but only on lines with the default background color. As it
     * stands with the current implementation, it's uncertain how much terminal performance this adds at
     * the cost of overhead within node.
     */
    useBCE: boolean

    /**
     * Amount of time (in ms) to redraw the screen after the terminal is resized (Default: 300).
     */
    resizeTimeout: number

    /**
     * The width of tabs within an element's content.
     */
    tabSize: number

    /**
     * Automatically position child elements with border and padding in mind (NOTE: this is a recommended
     * option. It may become default in the future).
     */
    autoPadding: boolean

    cursor: Types.TCursor

    /**
     * Dump all output and input to desired file. Can be used together with log option if set as a boolean.
     */
    dump: string

    /**
     * Array of keys in their full format (e.g. C-c) to ignore when keys are locked or grabbed. Useful
     * for creating a key that will always exit no matter whether the keys are locked.
     */
    ignoreLocked: boolean

    /**
     * Automatically "dock" borders with other elements instead of overlapping, depending on position
     * (experimental). For example: These border-overlapped elements:
     */
    dockBorders: boolean

    /**
     * Normally, dockable borders will not dock if the colors or attributes are different. This option
     * will allow them to dock regardless. It may produce some odd looking multi-colored borders though.
     */
    ignoreDockContrast: boolean

    /**
     * Allow for rendering of East Asian double-width characters, utf-16 surrogate pairs, and unicode
     * combining characters. This allows you to display text above the basic multilingual plane. This
     * is behind an option because it may affect performance slightly negatively. Without this option
     * enabled, all double-width, surrogate pair, and combining characters will be replaced by '??',
     * '?', '' respectively. (NOTE: iTerm2 cannot display combining characters properly. Blessed simply
     * removes them from an element's content if iTerm2 is detected).
     */
    fullUnicode: boolean

    /**
     * Send focus events after mouse is enabled.
     */
    sendFocus: boolean

    /**
     * Display warnings (such as the output not being a TTY, similar to ncurses).
     */
    warnings: boolean

    /**
     * Force blessed to use unicode even if it is not detected via terminfo, env variables, or windows code page.
     * If value is true unicode is forced. If value is false non-unicode is forced (default: null).
     */
    forceUnicode: boolean

    /**
     * Input and output streams. process.stdin/process.stdout by default, however, it could be a
     * net.Socket if you want to make a program that runs over telnet or something of that nature.
     */
    input: stream.Writable

    /**
     * Input and output streams. process.stdin/process.stdout by default, however, it could be a
     * net.Socket if you want to make a program that runs over telnet or something of that nature.
     */
    output: stream.Readable

    /**
     * The blessed Tput object (only available if you passed tput: true to the Program constructor.)
     */
    tput: Tput

    /**
     * Top of the focus history stack.
     */
    focused: BlessedElement

    /**
     * Width of the screen (same as program.cols).
     */
    width: Types.TPosition

    /**
     * Height of the screen (same as program.rows).
     */
    height: Types.TPosition

    /**
     * Same as screen.width.
     */
    cols: number

    /**
     * Same as screen.height.
     */
    rows: number

    /**
     * Relative top offset, always zero.
     */
    top: Types.TTopLeft

    /**
     * Relative left offset, always zero.
     */
    left: Types.TTopLeft

    /**
     * Relative right offset, always zero.
     */
    right: Types.TPosition

    /**
     * Relative bottom offset, always zero.
     */
    bottom: Types.TPosition

    /**
     * Absolute top offset, always zero.
     */
    atop: Types.TTopLeft

    /**
     * Absolute left offset, always zero.
     */
    aleft: Types.TTopLeft

    /**
     * Absolute right offset, always zero.
     */
    aright: Types.TPosition

    /**
     * Absolute bottom offset, always zero.
     */
    abottom: Types.TPosition

    /**
     * Whether the focused element grabs all keypresses.
     */
    grabKeys: any

    /**
     * Prevent keypresses from being received by any element.
     */
    lockKeys: boolean

    /**
     * The currently hovered element. Only set if mouse events are bound.
     */
    hover: any

    /**
     * Set or get terminal name. Set calls screen.setTerminal() internally.
     */
    terminal: string

    /**
     * Set or get window title.
     */
    title: string

    /**
     * Write string to the log file if one was created.
     */
    log(...msg: any[]): void

    /**
     * Same as the log method, but only gets called if the debug option was set.
     */
    debug(...msg: string[]): void

    /**
     * Allocate a new pending screen buffer and a new output screen buffer.
     */
    alloc(): void

    /**
     * Reallocate the screen buffers and clear the screen.
     */
    realloc(): void

    /**
     * Draw the screen based on the contents of the screen buffer.
     */
    draw(start: number, end: number): void

    /**
     * Will reset the focus, buffers, clear the sreen, alloc new memory, reset the keypad keys, stop listening to the mouse, etc. But won't emit destroy or other events nor unregister any listener. (I guess is like a reset)
     * @internal
     */
    leave() :void

    /**
     * @internal
     */
    postEnter(): void

    /**
     * Render all child elements, writing all data to the screen buffer and drawing the screen.
     */
    render(): void

    /**
     * Clear any region on the screen.
     */
    clearRegion(x1: number, x2: number, y1: number, y2: number): void

    /**
     * Fill any region with a character of a certain attribute.
     */
    fillRegion(attr: string, ch: string, x1: number, x2: number, y1: number, y2: number): void

    /**
     * Focus element by offset of focusable elements.
     */
    focusOffset(offset: number): any

    /**
     * Focus previous element in the index.
     */
    focusPrevious(): void

    /**
     * Focus next element in the index.
     */
    focusNext(): void

    /**
     * Push element on the focus stack (equivalent to screen.focused = el).
     */
    focusPush(element: BlessedElement): void

    /**
     * Pop element off the focus stack.
     */
    focusPop(): BlessedElement

    /**
     * Save the focused element.
     */
    saveFocus(): BlessedElement

    /**
     * Restore the saved focused element.
     */
    restoreFocus(): BlessedElement

    /**
     * "Rewind" focus to the last visible and attached element.
     */
    rewindFocus(): BlessedElement

    /**
     * Spawn a process in the foreground, return to blessed app after exit.
     */
    spawn(file: string, args?: string[], options?: NodeChildProcessExecOptions): child_process.ChildProcess

    /**
     * Spawn a process in the foreground, return to blessed app after exit. Executes callback on error or exit.
     */
    exec(
      file: string,
      args: string[],
      options: NodeChildProcessExecOptions,
      callback: (...args: any[]) => void
    ): child_process.ChildProcess

    /**
     * Read data from text editor.
     */
    readEditor(options: any, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void
    readEditor(callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void

    /**
     * Set effects based on two events and attributes.
     */
    setEffects(el: BlessedElement, fel: BlessedElement, over: any, out: any, effects: any, temp: any): void

    /**
     * Insert a line into the screen (using csr: this bypasses the output buffer).
     */
    insertLine(n: number, y: number, top: number, bottom: number): void

    /**
     * Delete a line from the screen (using csr: this bypasses the output buffer).
     */
    deleteLine(n: number, y: number, top: number, bottom: number): void

    /**
     * Insert a line at the bottom of the screen.
     */
    insertBottom(top: number, bottom: number): void

    /**
     * Insert a line at the top of the screen.
     */
    insertTop(top: number, bottom: number): void

    /**
     * Delete a line at the bottom of the screen.
     */
    deleteBottom(top: number, bottom: number): void

    /**
     * Delete a line at the top of the screen.
     */
    deleteTop(top: number, bottom: number): void

    /**
     * Enable mouse events for the screen and optionally an element (automatically called when a form of
     * on('mouse') is bound).
     */
    enableMouse(el?: BlessedElement): void

    /**
     * Enable keypress events for the screen and optionally an element (automatically called when a form of
     * on('keypress') is bound).
     */
    enableKeys(el?: BlessedElement): void

    /**
     * Enable key and mouse events. Calls bot enableMouse and enableKeys.
     */
    enableInput(el?: BlessedElement): void

    /**
     * Attempt to copy text to clipboard using iTerm2's proprietary sequence. Returns true if successful.
     */
    copyToClipboard(text: string): void

    /**
     * Attempt to change cursor shape. Will not work in all terminals (see artificial cursors for a solution
     * to this). Returns true if successful.
     */
    cursorShape(shape: boolean, blink: boolean): any

    /**
     * Attempt to change cursor color. Returns true if successful.
     */
    cursorColor(color: string): void

    /**
     * Attempt to reset cursor. Returns true if successful.
     */
    cursorReset(): void

    /**
     * Take an SGR screenshot of the screen within the region. Returns a string containing only
     * characters and SGR codes. Can be displayed by simply echoing it in a terminal.
     */
    screenshot(xi: number, xl: number, yi: number, yl: number): string
    screenshot(): void

    /**
     * Destroy the screen object and remove it from the global list. Also remove all global events relevant
     * to the screen object. If all screen objects are destroyed, the node process is essentially reset
     * to its initial state.
     */
    destroy(): void

    /**
     * Reset the terminal to term. Reloads terminfo.
     */
    setTerminal(term: string): void
  }

  interface Padding {
    left?: number
    right?: number
    top?: number
    bottom?: number
  }

  type Color = number | string

  class PositionCoords {
    xi: number
    xl: number
    yi: number
    yl: number
  }

  interface Position {
    left: number | string
    right: number | string
    top: number | string
    bottom: number | string
  }

  type BorderType = 'line' | 'bg'
  // interface Border {
  //   /**
  //    * Type of border (line or bg). bg by default.
  //    */
  //   type?: BorderType

  //   /**
  //    * Character to use if bg type, default is space.
  //    */
  //   ch?: string

  //   /**
  //    * Border foreground and background, must be numbers (-1 for default).
  //    */
  //   bg?: number
  //   fg?: number

  //   /**
  //    * Border attributes.
  //    */
  //   bold?: boolean
  //   underline?: boolean

  //   top?: boolean
  //   left?: boolean
  //   right?: boolean
  //   bottom?: boolean
  // }

  interface ElementOptions extends INodeOptions {
    tags?: boolean

    fg?: Color
    bg?: Color
    bold?: boolean
    underline?: boolean

    style?: Widgets.Types.TStyle

    /**
     * Border object, see below.
     */
    border?: TBorder | BorderType

    /**
     * Element's text content.
     */
    content?: string

    /**
     * Element is clickable.
     */
    clickable?: boolean

    /**
     * Element is focusable and can receive key input.
     */
    input?: boolean
    keyable?: boolean

    /**
     * Element is focused.
     */
    focused?: boolean

    /**
     * Whether the element is hidden.
     */
    hidden?: boolean

    /**
     * A simple text label for the element.
     */
    label?: string

    /**
     * A floating text label for the element which appears on mouseover.
     */
    hoverText?: string

    /**
     * Text alignment: left, center, or right.
     */
    align?: 'left' | 'center' | 'right'

    /**
     * Vertical text alignment: top, middle, or bottom.
     */
    valign?: 'top' | 'middle' | 'bottom'

    /**
     * Shrink/flex/grow to content and child elements. Width/height during render.
     */
    shrink?: boolean

    /**
     * Amount of padding on the inside of the element. Can be a number or an object containing
     * the properties: left, right, top, and bottom.
     */
    padding?: number | Padding

    top?: Types.TTopLeft
    left?: Types.TTopLeft
    right?: Types.TPosition
    bottom?: Types.TPosition

    /**
     * Width/height of the element, can be a number, percentage (0-100%), or keyword (half or shrink).
     * Percentages can also have offsets (50%+1, 50%-1).
     */
    width?: number | string

    /**
     * Offsets of the element relative to its parent. Can be a number, percentage (0-100%), or
     * keyword (center). right and bottom do not accept keywords. Percentages can also have
     * offsets (50%+1, 50%-1).
     */
    height?: number | string

    /**
     * Can contain the above options.
     */
    position?: Position

    /**
     * Whether the element is scrollable or not.
     */
    scrollable?: boolean

    /**
     * Background character (default is whitespace ).
     */
    ch?: string

    /**
     * Allow the element to be dragged with the mouse.
     */
    draggable?: boolean

    /**
     * Draw a translucent offset shadow behind the element.
     */
    shadow?: boolean
  }

  interface Coords {
    xl: number
    xi: number
    yl: number
    yi: number
    base: number
    _contentEnd: { x: number; y: number }
    notop: Types.TTopLeft
    noleft: Types.TTopLeft
    noright: Types.TPosition
    nobot: Types.TPosition
  }

  interface LabelOptions {
    text: string
    side: Types.TAlign
  }

  // TODO: scrollable - Note: If the scrollable option is enabled, Element inherits all methods from ScrollableBox.
  /**
   * Abstract base element. Elements are [[Node]] that are rendered visually so they have dimention, position, content,
   * border, padding, etc.
   *
   * ## Content Methods
   *
   * * Methods for dealing with text content, line by line. Useful for writing a text editor,
   * irc client, etc.
   *
   * * Note: All of these methods deal with pre-aligned, pre-wrapped text. If you use deleteTop()
   * on a box with a wrapped line at the top, it may remove 3-4 "real" lines (rows) depending
   * on how long the original line was.
   *
   * * The lines parameter can be a string or an array of strings. The line parameter must
   * be a string.
   */
  abstract class BlessedElement extends NodeWithEvents implements IHasOptions<ElementOptions> {
    constructor(opts: ElementOptions)

    /**
     * Original options object.
     */
    options: ElementOptions

    /**
     * Name of the element. Useful for form submission.
     */
    name: string

    /**
     * Border object.
     */
    border: Border

    /** Current element padding */
    padding: Required<Padding>

    style: Widgets.Types.TStyle
    position: Position
    content: string
    hidden: boolean
    visible: boolean
    detached: boolean

    /**
     * Border foreground and background, must be numbers (-1 for default).
     */
    bg: number
    fg: number

    /**
     * Border attributes.
     */
    bold: string
    underline: string

    /**
     * Calculated width.
     */
    width: number

    /**
     * Calculated height.
     */
    height: number

    /**
     * Calculated relative top offset.
     */
    top: number

    /**
     * Calculated relative left offset.
     */
    left: number

    /**
     * Calculated relative right offset.
     */
    right: number

    /**
     * Calculated relative bottom offset.
     */
    bottom: number

    /**
     * Calculated absolute top offset.
     */
    atop: number

    /**
     * Calculated absolute left offset.
     */
    aleft: number

    /**
     * Calculated absolute right offset.
     */
    aright: number

    /**
     * Calculated absolute bottom offset.
     */
    abottom: number

    /**
     * Whether the element is draggable. Set to true to allow dragging.
     */
    draggable: boolean

    itop: Types.TTopLeft
    ileft: Types.TTopLeft
    iheight: Types.TPosition
    iwidth: Types.TPosition

    /**
     * Calculated relative top offset.
     */
    rtop: Types.TTopLeft

    /**
     * Calculated relative left offset.
     */
    rleft: Types.TTopLeft

    /**
     * Calculated relative right offset.
     */
    rright: Types.TPosition

    /**
     * Calculated relative bottom offset.
     */
    rbottom: Types.TPosition

    lpos: PositionCoords

    /**
     * Write content and children to the screen buffer.
     */
    render(): Coords

    /**
     * Hide element.
     */
    hide(): void

    /**
     * Show element.
     */
    show(): void

    /**
     * Toggle hidden/shown.
     */
    toggle(): void

    /**
     * Focus element.
     */
    focus(): void

    /**
     * Same asel.on('screen', ...) except this will automatically keep track of which listeners
     * are bound to the screen object. For use with removeScreenEvent(), free(), and destroy().
     */
    onScreenEvent(type: string, handler: (...args: any[]) => void): void

    /**
     * Same asel.removeListener('screen', ...) except this will automatically keep track of which
     * listeners are bound to the screen object. For use with onScreenEvent(), free(), and destroy().
     */
    removeScreenEvent(type: string, handler: (...args: any[]) => void): void

    /**
     * Free up the element. Automatically unbind all events that may have been bound to the screen
     * object. This prevents memory leaks. For use with onScreenEvent(), removeScreenEvent(),
     * and destroy().
     */

    free(): void

    /**
     * Same as the detach() method, except this will automatically call free() and unbind any screen
     * events to prevent memory leaks. for use with onScreenEvent(), removeScreenEvent(), and free().
     */
    destroy(): void

    /**
     * Set the z-index of the element (changes rendering order).
     */
    setIndex(z: number): void

    /**
     * Put the element in front of its siblings.
     */
    setFront(): void

    /**
     * Put the element in back of its siblings.
     */
    setBack(): void

    /**
     * text/options - Set the label text for the top-left corner. Example options: {text:'foo',side:'left'}
     */
    setLabel(arg: string | LabelOptions): void

    /**
     * Remove the label completely.
     */
    removeLabel(): any

    /**
     * text/options - Set a hover text box to follow the cursor. Similar to the "title" DOM attribute
     * in the browser. Example options: {text:'foo'}
     */
    setHover(arg: string | LabelOptions): void

    /**
     * Remove the hover label completely.
     */
    removeHover(): void

    /**
     * Enable mouse events for the element (automatically called when a form of on('mouse') is bound).
     */
    enableMouse(): void

    /**
     * Enable keypress events for the element (automatically called when a form of on('keypress') is bound).
     */
    enableKeys(): void

    /**
     * Enable key and mouse events. Calls bot enableMouse and enableKeys.
     */
    enableInput(): void

    /**
     * Enable dragging of the element.
     */
    enableDrag(): void

    /**
     * Disable dragging of the element.
     */
    disableDrag(): void

    /**
     * Take an SGR screenshot of the screen within the region. Returns a string containing only
     * characters and SGR codes. Can be displayed by simply echoing it in a terminal.
     */
    screenshot(xi: number, xl: number, yi: number, yl: number): string
    screenshot(): void

    /**
     * Set the content. Note: When text is input, it will be stripped of all non-SGR
     * escape codes, tabs will be replaced with 8 spaces, and tags will be replaced
     * with SGR codes (if enabled).
     */
    setContent(text: string): void

    /**
     * Return content, slightly different from el.content. Assume the above formatting.
     */
    getContent(): string

    /**
     * Similar to setContent, but ignore tags and remove escape codes.
     */
    setText(text: string): void

    /**
     * Similar to getContent, but return content with tags and escape codes removed.
     */
    getText(): string

    /**
     * Insert a line into the box's content.
     */
    insertLine(i: number, lines: string | string[]): void

    /**
     * Delete a line from the box's content.
     */
    deleteLine(i: number): void

    /**
     * Get a line from the box's content.
     */
    getLine(i: number): string

    /**
     * Get a line from the box's content from the visible top.
     */
    getBaseLine(i: number): string

    /**
     * Set a line in the box's content.
     */
    setLine(i: number, line: string | string[]): void

    /**
     * Set a line in the box's content from the visible top.
     */
    setBaseLine(i: number, line: string | string[]): void

    /**
     * Clear a line from the box's content.
     */
    clearLine(i: number): void

    /**
     * Clear a line from the box's content from the visible top.
     */
    clearBaseLine(i: number): void

    /**
     * Insert a line at the top of the box.
     */
    insertTop(lines: string | string[]): void

    /**
     * Insert a line at the bottom of the box.
     */
    insertBottom(lines: string | string[]): void

    /**
     * Delete a line at the top of the box.
     */
    deleteTop(): void

    /**
     * Delete a line at the bottom of the box.
     */
    deleteBottom(): void

    /**
     * Unshift a line onto the top of the content.
     */
    unshiftLine(lines: string | string[]): void

    /**
     * Shift a line off the top of the content.
     */
    shiftLine(i: number): void

    /**
     * Push a line onto the bottom of the content.
     */
    pushLine(lines: string | string[]): void

    /**
     * Pop a line off the bottom of the content.
     */
    popLine(i: number): string

    /**
     * An array containing the content lines.
     */
    getLines(): string[]

    /**
     * An array containing the lines as they are displayed on the screen.
     */
    getScreenLines(): string[]

    /**
     * Get a string's displayed width, taking into account double-width, surrogate pairs,
     * combining characters, tags, and SGR escape codes.
     */
    strWidth(text: string): string
  }

  interface ScrollableBoxOptions extends ElementOptions {
    /**
     * A limit to the childBase. Default is Infinity.
     */
    baseLimit?: number

    /**
     * A option which causes the ignoring of childOffset. This in turn causes the
     * childBase to change every time the element is scrolled.
     */
    alwaysScroll?: boolean

    /**
     * Object enabling a scrollbar.
     * Style of the scrollbar track if present (takes regular style options).
     */
    scrollbar?: { style?: Widgets.Types.TStyle; track?: Widgets.Types.TStyle; ch?: string } | boolean
  }

  interface ScrollableTextOptions extends ScrollableBoxOptions {
    /**
     * Whether to enable automatic mouse support for this element.
     * Use pre-defined mouse events (right-click for editor).
     */
    mouse?: boolean

    /**
     * Use pre-defined keys (i or enter for insert, e for editor, C-e for editor while inserting).
     */
    keys?: string | string[] | boolean

    /**
     * Use vi keys with the keys option.
     */
    vi?: boolean
  }

  interface BoxOptions extends ScrollableTextOptions {
    bindings?: any
  }

  /**
   * DEPRECATED - Use Box with the scrollable option instead. A box with scrollable content.
   */
  class ScrollableBoxElement extends BlessedElement {
    /**
     * The offset of the top of the scroll content.
     */
    childBase: number

    /**
     * The offset of the chosen item/line.
     */
    childOffset: number

    /**
     * Scroll the content by a relative offset.
     */
    scroll(offset: number, always?: boolean): void

    /**
     * Scroll the content to an absolute index.
     */
    scrollTo(index: number): void

    /**
     * Same as scrollTo.
     */
    setScroll(index: number): void

    /**
     * Set the current scroll index in percentage (0-100).
     */
    setScrollPerc(perc: number): void

    /**
     * Get the current scroll index in lines.
     */
    getScroll(): number

    /**
     * Get the actual height of the scrolling area.
     */
    getScrollHeight(): number

    /**
     * Get the current scroll index in percentage.
     */
    getScrollPerc(): number

    /**
     * Reset the scroll index to its initial state.
     */
    resetScroll(): void

    on(event: string, listener: (...args: any[]) => void): this

    /**
     * Received when the element is scrolled.
     */
    on(event: 'scroll', callback: () => void): this
  }

  /**
   * DEPRECATED - Use Box with the scrollable and alwaysScroll options instead.
   * A scrollable text box which can display and scroll text, as well as handle
   * pre-existing newlines and escape codes.
   */
  class ScrollableTextElement extends ScrollableBoxElement {}

  /**
   * A box element which draws a simple box containing content or other elements.
   */
  class BoxElement extends ScrollableTextElement implements IHasOptions<BoxOptions> {
    constructor(opts: BoxOptions)

    /**
     * Original options object.
     */
    options: BoxOptions
  }

  interface TextOptions extends ElementOptions {
    /**
     * Fill the entire line with chosen bg until parent bg ends, even if there
     * is not enough text to fill the entire width.
     */
    fill?: boolean

    /**
     * Text alignment: left, center, or right.
     */
    align?: Types.TAlign
  }

  /**
   * An element similar to Box, but geared towards rendering simple text elements.
   */
  class TextElement extends BlessedElement implements IHasOptions<TextOptions> {
    constructor(opts: TextOptions)

    /**
     * Original options object.
     */
    options: TextOptions
  }

  /**
   * A simple line which can be line or bg styled.
   */
  interface LineOptions extends BoxOptions {
    /**
     * Can be vertical or horizontal.
     */
    orientation?: 'vertical' | 'horizontal'

    /**
     * Treated the same as a border object. (attributes can be contained in style).
     */
    type?: string
    bg?: Color
    fg?: Color
    ch?: string
  }

  /**
   * A simple line which can be line or bg styled.
   */
  class LineElement extends BoxElement implements IHasOptions<LineOptions> {
    constructor(opts: LineOptions)

    /**
     * Original options object.
     */
    options: LineOptions
  }

  interface BigTextOptions extends BoxOptions {
    /**
     * bdf->json font file to use (see ttystudio for instructions on compiling BDFs to JSON).
     */
    font?: string

    /**
     * bdf->json bold font file to use (see ttystudio for instructions on compiling BDFs to JSON).
     */
    fontBold?: string

    /**
     * foreground character. (default: ' ')
     */
    fch?: string
  }

  /**
   * A box which can render content drawn as 8x14 cell characters using the terminus font.
   */
  class BigTextElement extends BoxElement implements IHasOptions<BigTextOptions> {
    constructor(opts: BigTextOptions)

    /**
     * Original options object.
     */
    options: BigTextOptions
  }

  interface ListElementStyle extends Widgets.Types.TStyle {
    selected?: Widgets.Types.TStyle
    item?: Widgets.Types.TStyle
  }

  interface ListOptions<TStyle extends ListElementStyle = {}> extends BoxOptions {
    /**
     * Style for a selected item. Style for an unselected item.
     */
    style?: TStyle

    /**
     * An array of strings which become the list's items.
     */
    items?: string[]

    /**
     * A function that is called when vi mode is enabled and the key / is pressed. This function accepts a
     * callback function which should be called with the search string. The search string is then used to
     * jump to an item that is found in items.
     */
    search?(err: any, value?: string): void

    /**
     * Whether the list is interactive and can have items selected (Default: true).
     */
    interactive?: boolean

    /**
     * Whether to automatically override tags and invert fg of item when selected (Default: true).
     */
    invertSelected?: boolean
  }

  type ListElementEventType =
    /** List was canceled (when esc is pressed with the keys option). */
    | 'cancel'
    /** Either a select or a cancel event was received. */
    | 'action'
    | 'create item'
    | 'add item'
    | 'remove item'
    | 'insert item'
    | 'set items'

  class ListElement extends BoxElement implements IHasOptions<ListOptions<ListElementStyle>> {
    constructor(opts: ListOptions<ListElementStyle>)

    /**
     * Original options object.
     */
    options: ListOptions<ListElementStyle>

    /**
     * Add an item based on a string.
     */
    add(text: string): void

    /**
     * Add an item based on a string.
     */
    addItem(text: string): void

    /**
     * Removes an item from the list. Child can be an element, index, or string.
     */
    removeItem(child: BlessedElement): BlessedElement

    /**
     * Push an item onto the list.
     */
    pushItem(child: BlessedElement): number

    /**
     * Pop an item off the list.
     */
    popItem(): BlessedElement

    /**
     * Unshift an item onto the list.
     */
    unshiftItem(child: BlessedElement): number

    /**
     * Shift an item off the list.
     */
    shiftItem(): BlessedElement

    /**
     * Inserts an item to the list. Child can be an element, index, or string.
     */
    insertItem(i: number, child: BlessedElement): void

    /**
     * Returns the item element. Child can be an element, index, or string.
     */
    getItem(child: BlessedElement): BlessedElement

    /**
     * Set item to content.
     */
    setItem(child: BlessedElement, content: BlessedElement | string): void

    /**
     * Remove and insert items to the list.
     */
    spliceItem(i: number, n: number, ...items: BlessedElement[]): void

    /**
     * Clears all items from the list.
     */
    clearItems(): void

    /**
     * Sets the list items to multiple strings.
     */
    setItems(items: BlessedElement[]): void

    /**
     * Returns the item index from the list. Child can be an element, index, or string.
     */
    getItemIndex(child: BlessedElement): number

    /**
     * Select an index of an item.
     */
    select(index: number): void

    /**
     * Select item based on current offset.
     */
    move(offset: number): void

    /**
     * Select item above selected.
     */
    up(amount: number): void

    /**
     * Select item below selected.
     */
    down(amount: number): void

    /**
     * Show/focus list and pick an item. The callback is executed with the result.
     */
    pick(callback: () => void): void

    /**
     * Find an item based on its text content.
     */
    fuzzyFind(arg: string | RegExp | (() => void)): void

    on(event: string, listener: (...args: any[]) => void): this
    /** Received when an item is selected. */
    on(event: 'select', callback: (item: BoxElement, index: number) => void): this
    on(event: ListElementEventType, callback: () => void): this
    on(event: 'select item', callback: (item: BlessedElement, index: number) => void): this
  }

  interface FileManagerOptions extends ListOptions<ListElementStyle> {
    /**
     * Current working directory.
     */
    cwd?: string
  }

  class FileManagerElement extends ListElement implements IHasOptions<FileManagerOptions> {
    constructor(opts: FileManagerOptions)

    /**
     * Original options object.
     */
    options: FileManagerOptions

    /**
     * Current working directory.
     */
    cwd: string

    /**
     * Refresh the file list (perform a readdir on cwd and update the list items).
     */
    refresh(cwd: string, callback: () => void): void
    refresh(callback?: () => void): void

    /**
     * Pick a single file and return the path in the callback.
     */
    pick(cwd: string, callback: () => void): void
    pick(callback: () => void): void

    /**
     * Reset back to original cwd.
     */
    reset(cwd: string, callback: () => void): void
    reset(callback?: () => void): void

    on(event: string, listener: (...args: any[]) => void): this
    /** Received when an item is selected. */
    on(event: 'cd', callback: (file: string, cwd: string) => void): this
    /** Received when an item is selected. */
    on(event: 'file', callback: (file: string) => void): this
    on(event: 'error', callback: (err: any, file: string) => void): this
    on(event: 'refresh', callback: () => void): this
  }

  interface StyleListTable extends ListElementStyle {
    /**
     * Header style.
     */
    header?: any

    /**
     * Cell style.
     */
    cell?: any
  }

  interface ListTableOptions extends ListOptions<StyleListTable> {
    /**
     * Array of array of strings representing rows.
     */
    rows?: string[]
    data?: string[][]

    /**
     * Spaces to attempt to pad on the sides of each cell. 2 by default: one space on each side
     * (only useful if the width is shrunken).
     */
    pad?: number

    /**
     * Do not draw inner cells.
     */
    noCellBorders?: boolean

    style?: StyleListTable
  }

  class ListTableElement extends ListElement implements IHasOptions<ListTableOptions> {
    constructor(opts: ListTableOptions)

    /**
     * Original options object.
     */
    options: ListTableOptions

    /**
     * Set rows in table. Array of arrays of strings.
     * @example:
     *
     * table.setData([
     *      [ 'Animals',  'Foods'  ],
     *      [ 'Elephant', 'Apple'  ],
     *      [ 'Bird',     'Orange' ]
     *  ]);
     */
    setRows(rows: string[][]): void

    /**
     * Set rows in table. Array of arrays of strings.
     * @example:
     *
     * table.setData([
     *      [ 'Animals',  'Foods'  ],
     *      [ 'Elephant', 'Apple'  ],
     *      [ 'Bird',     'Orange' ]
     *  ]);
     */
    setData(rows: string[][]): void
  }

  interface ListbarOptions extends BoxOptions {
    style?: ListElementStyle

    /**
     * Set buttons using an object with keys as titles of buttons, containing of objects
     * containing keys of keys and callback.
     */
    commands: (Types.ListbarCommand[]) | ({ [name: string]: Types.ListbarCommand }) | { [name: string]: () => void }
    items?: Types.ListbarCommand[]

    /**
     * Automatically bind list buttons to keys 0-9.
     */
    autoCommandKeys?: boolean
  }

  class ListbarElement extends BoxElement implements IHasOptions<ListbarOptions> {
    constructor(opts: ListbarOptions)

    /**
     * Original options object.
     */
    options: ListbarOptions

    /**
     * Set commands (see commands option above).
     */
    setItems(commands: Types.ListbarCommand[]): void

    /**
     * Append an item to the bar.
     */
    add(item: Types.ListbarCommand, callback: () => void): void

    /**
     * Append an item to the bar.
     */
    addItem(item: Types.ListbarCommand, callback: () => void): void

    /**
     * Append an item to the bar.
     */
    appendItem(item: Types.ListbarCommand, callback: () => void): void

    /**
     * Select an item on the bar.
     */
    select(offset: number): void

    /**
     * Remove item from the bar.
     */
    removeItem(child: BlessedElement): void

    /**
     * Move relatively across the bar.
     */
    move(offset: number): void

    /**
     * Move left relatively across the bar.
     */
    moveLeft(offset: number): void

    /**
     * Move right relatively across the bar.
     */
    moveRight(offset: number): void

    /**
     * Select button and execute its callback.
     */
    selectTab(index: number): void

    on(event: string, listener: (...args: any[]) => void): this
    on(event: 'set items' | 'remove item' | 'select tab', callback: () => void): this
  }

  interface FormOptions extends BoxOptions {
    /**
     * Allow default keys (tab, vi keys, enter).
     */
    keys?: any

    /**
     * Allow vi keys.
     */
    vi?: boolean
  }

  class FormElement<TFormData = any> extends BoxElement implements IHasOptions<FormOptions> {
    constructor(opts: FormOptions)

    /**
     * Original options object.
     */
    options: FormOptions

    /**
     * Last submitted data.
     */
    submission: TFormData

    /**
     * Focus next form element.
     */
    focusNext(): void

    /**
     * Focus previous form element.
     */
    focusPrevious(): void

    /**
     * Submit the form.
     */
    submit(): void

    /**
     * Discard the form.
     */
    cancel(): void

    /**
     * Clear the form.
     */
    reset(): void

    on(event: string, listener: (this: FormElement, ...args: any[]) => void): this
    /** Form is submitted. Receives a data object. */
    on(event: 'submit', callback: (this: FormElement, out: TFormData) => void): this
    on(event: 'cancel' | 'reset', callback: (this: FormElement) => void): this
  }

  interface InputOptions extends BoxOptions {}

  abstract class InputElement extends BoxElement {
    constructor(opts: InputOptions)
  }

  /**
   * A box which allows multiline text input.
   */
  interface TextareaOptions extends InputOptions {
    /**
     * Call readInput() when the element is focused. Automatically unfocus.
     */
    inputOnFocus?: boolean
  }

  type TextareaElementEventType =
    /** Value is an error. */
    | 'error'
    /** Value is submitted (enter). */
    | 'submit'
    /** Value is discared (escape). */
    | 'cancel'
    /** Either submit or cancel. */
    | 'action'

  class TextareaElement extends InputElement implements IHasOptions<TextareaOptions> {
    constructor(opts: TextareaOptions)

    /**
     * Original options object.
     */
    options: TextareaOptions

    /**
     * The input text. read-only.
     */
    value: string

    /**
     * Submit the textarea (emits submit).
     */
    submit(): void

    /**
     * Cancel the textarea (emits cancel).
     */
    cancel(): void

    /**
     * Grab key events and start reading text from the keyboard. Takes a callback which receives
     * the final value.
     */
    readInput(callback?: (err: any, value?: string) => void): void

    /**
     * Grab key events and start reading text from the keyboard. Takes a callback which receives
     * the final value.
     */
    input(callback: (err: any, value?: string) => void): void

    /**
     * Grab key events and start reading text from the keyboard. Takes a callback which receives
     * the final value.
     */
    setInput(callback: (err: any, value?: string) => void): void

    /**
     * Open text editor in $EDITOR, read the output from the resulting file. Takes a callback which
     * receives the final value.
     */
    readEditor(callback: (err: any, value?: string) => void): void

    /**
     * Open text editor in $EDITOR, read the output from the resulting file. Takes a callback which
     * receives the final value.
     */
    editor(callback: (err: any, value?: string) => void): void

    /**
     * Open text editor in $EDITOR, read the output from the resulting file. Takes a callback which
     * receives the final value.
     */
    setEditor(callback: (err: any, value?: string) => void): void

    /**
     * The same as this.value, for now.
     */
    getValue(): string

    /**
     * Clear input.
     */
    clearValue(): void

    /**
     * Set value.
     */
    setValue(text: string): void

    on(event: string, listener: (...args: any[]) => void): this
    on(event: TextareaElementEventType, callback: (err: any) => void): this
  }

  interface TextboxOptions extends TextareaOptions {
    /**
     * Completely hide text.
     */
    secret?: boolean

    /**
     * Replace text with asterisks (*).
     */
    censor?: boolean
  }

  class TextboxElement extends TextareaElement implements IHasOptions<TextboxOptions> {
    constructor(opts: TextboxOptions)

    /**
     * Original options object.
     */
    options: TextboxOptions

    /**
     * Completely hide text.
     */
    secret: boolean

    /**
     * Replace text with asterisks (*).
     */
    censor: boolean
  }

  interface ButtonOptions extends BoxOptions {}

  class ButtonElement extends InputElement implements IHasOptions<ButtonOptions> {
    constructor(opts: ButtonOptions)

    /**
     * Original options object.
     */
    options: ButtonOptions

    /**
     * Press button. Emits press.
     */
    press(): void

    on(event: string, listener: (...args: any[]) => void): this
    on(event: 'press', callback: () => void): this
  }

  interface CheckboxOptions extends BoxOptions {
    /**
     * whether the element is checked or not.
     */
    checked?: boolean

    // /**
    //  * enable mouse support.
    //  */
    // mouse?: boolean
  }

  /**
   * A checkbox which can be used in a form element.
   */
  class CheckboxElement extends InputElement implements IHasOptions<CheckboxOptions> {
    constructor(options?: CheckboxOptions)

    /**
     * Original options object.
     */
    options: CheckboxOptions

    /**
     * the text next to the checkbox (do not use setcontent, use `check.text = ''`).
     */
    text: string

    /**
     * whether the element is checked or not.
     */
    checked: boolean

    /**
     * same as `checked`.
     */
    value: boolean

    /**
     * check the element.
     */
    check(): void

    /**
     * uncheck the element.
     */
    uncheck(): void

    /**
     * toggle checked state.
     */
    toggle(): void

    on(event: string, listener: (this: CheckboxElement, ...args: any[]) => void): this
    on(event: 'check', callback: (this: CheckboxElement) => void): this
    on(event: 'uncheck', callback: (this: CheckboxElement) => void): this
  }

  interface RadioSetOptions extends BoxOptions {}

  /**
   * An element wrapping RadioButtons. RadioButtons within this element will be mutually exclusive
   * with each other.
   */
  abstract class RadioSetElement extends BoxElement {
    constructor(opts: RadioSetOptions)
  }

  interface RadioButtonOptions extends CheckboxOptions {}

  /**
   * A radio button which can be used in a form element.
   */
  abstract class RadioButtonElement extends CheckboxElement {
    constructor(opts: RadioButtonOptions)
  }

  interface PromptOptions extends BoxOptions {}

  /**
   * A prompt box containing a text input, okay, and cancel buttons (automatically hidden).
   */
  class PromptElement extends BoxElement implements IHasOptions<PromptOptions> {
    constructor(opts: PromptOptions)

    options: PromptOptions

    /**
     * Show the prompt and wait for the result of the textbox. Set text and initial value.
     */
    input(text: string, value: string, callback: (err: any, value: string) => void): void
    setInput(text: string, value: string, callback: (err: any, value: string) => void): void
    readInput(text: string, value: string, callback: (err: any, value: string) => void): void
  }

  interface QuestionOptions extends BoxOptions {}

  /**
   * A question box containing okay and cancel buttons (automatically hidden).
   */
  class QuestionElement extends BoxElement implements IHasOptions<QuestionOptions> {
    constructor(opts: QuestionOptions)

    options: QuestionOptions

    /**
     * Ask a question. callback will yield the result.
     */
    ask(question: string, callback: (err: any, value: string) => void): void
  }

  interface MessageOptions extends BoxOptions {}

  /**
   * A box containing a message to be displayed (automatically hidden).
   */
  class MessageElement extends BoxElement implements IHasOptions<MessageOptions> {
    constructor(opts: MessageOptions)

    options: MessageOptions

    /**
     * Display a message for a time (default is 3 seconds). Set time to 0 for a
     * perpetual message that is dismissed on keypress.
     */
    log(text: string, time: number, callback: (err: any) => void): void
    log(text: string, callback: (err: any) => void): void
    display(text: string, time: number, callback: (err: any) => void): void
    display(text: string, callback: (err: any) => void): void

    /**
     * Display an error in the same way.
     */
    error(text: string, time: number, callback: () => void): void
    error(text: string, callback: () => void): void
  }

  interface LoadingOptions extends BoxOptions {}

  /**
   * A box with a spinning line to denote loading (automatically hidden).
   */
  class LoadingElement extends BoxElement implements IHasOptions<LoadingOptions> {
    constructor(opts: LoadingOptions)

    options: LoadingOptions

    /**
     * Display the loading box with a message. Will lock keys until stop is called.
     */
    load(text: string): void

    /**
     * Hide loading box. Unlock keys.
     */
    stop(): void
  }

  interface ProgressBarOptions extends BoxOptions {
    /**
     * can be `horizontal` or `vertical`.
     */
    orientation: string

    /**
     * the character to fill the bar with (default is space).
     */
    pch: string

    /**
     * the amount filled (0 - 100).
     */
    filled: number

    /**
     * same as `filled`.
     */
    value: number

    /**
     * enable key support.
     */
    keys: boolean

    /**
     * enable mouse support.
     */
    mouse: boolean
  }

  /**
   * A progress bar allowing various styles. This can also be used as a form input.
   */
  class ProgressBarElement extends InputElement implements IHasOptions<ProgressBarOptions> {
    constructor(options?: ProgressBarOptions)

    options: ProgressBarOptions

    /**
     * progress the bar by a fill amount.
     */
    progress(amount: number): void

    /**
     * set progress to specific amount.
     */
    setProgress(amount: number): void

    /**
     * reset the bar.
     */
    reset(): void

    on(event: string, listener: (...args: any[]) => void): this
    on(event: 'reset' | 'complete', callback: () => void): this
  }

  interface LogOptions extends ScrollableTextOptions {
    /**
     * amount of scrollback allowed. default: Infinity.
     */
    scrollback?: number

    /**
     * scroll to bottom on input even if the user has scrolled up. default: false.
     */
    scrollOnInput?: boolean
  }

  /**
   * A log permanently scrolled to the bottom.
   */
  class Log extends ScrollableTextElement implements IHasOptions<LogOptions> {
    constructor(options?: LogOptions)

    options: LogOptions

    /**
     * amount of scrollback allowed. default: Infinity.
     */
    scrollback: number

    /**
     * scroll to bottom on input even if the user has scrolled up. default: false.
     */
    scrollOnInput: boolean

    /**
     * add a log line.
     */
    log(text: string): void

    /**
     * add a log line.
     */
    add(text: string): void
  }

  interface TableOptions extends BoxOptions {
    /**
     * array of array of strings representing rows (same as `data`).
     */
    rows?: string[][]

    /**
     * array of array of strings representing rows (same as `rows`).
     */
    data?: string[][]

    /**
     * spaces to attempt to pad on the sides of each cell. `2` by default: one space on each side (only useful if the width is shrunken).
     */
    pad?: number

    /**
     * do not draw inner cells.
     */
    noCellBorders?: boolean

    /**
     * fill cell borders with the adjacent background color.
     */
    fillCellBorders?: boolean
  }

  /**
   * A stylized table of text elements.
   */
  class TableElement extends BoxElement implements IHasOptions<TableOptions> {
    constructor(opts: TableOptions)

    options: TableOptions

    /**
     * set rows in table. array of arrays of strings.
     */
    setData(rows: string[][]): void

    /**
     * set rows in table. array of arrays of strings.
     */
    setRows(rows: string[][]): void
  }

  interface TerminalOptions extends BoxOptions {
    /**
     * handler for input data.
     */
    handler?(userInput: Buffer): void

    /**
     * name of shell. $SHELL by default.
     */
    shell?: string

    /**
     * args for shell.
     */
    args?: any

    /**
     * can be line, underline, and block.
     */
    cursor?: 'line' | 'underline' | 'block'

    terminal?: string

    /**
     * Object for process env.
     */
    env?: any
  }

  class TerminalElement extends BoxElement implements IHasOptions<TerminalOptions> {
    constructor(opts: TerminalOptions)

    options: TerminalOptions

    /**
     * reference to the headless term.js terminal.
     */
    term: any

    /**
     * reference to the pty.js pseudo terminal.
     */
    pty: any

    /**
     * write data to the terminal.
     */
    write(data: string): void

    /**
     * nearly identical to `element.screenshot`, however, the specified region includes the terminal's
     * _entire_ scrollback, rather than just what is visible on the screen.
     */
    screenshot(xi?: number, xl?: number, yi?: number, yl?: number): string
  }

  interface ImageOptions extends BoxOptions {
    /**
     * path to image.
     */
    file: string

    /**
     * path to w3mimgdisplay. if a proper w3mimgdisplay path is not given, blessed will search the
     * entire disk for the binary.
     */
    type: 'ansi' | 'overlay' | 'w3m'
  }

  /**
   * Display an image in the terminal (jpeg, png, gif) using w3mimgdisplay. Requires w3m to be installed.
   * X11 required: works in xterm, urxvt, and possibly other terminals.
   */
  class ImageElement extends BoxElement implements IHasOptions<ImageOptions> {
    constructor(options?: ImageOptions)

    options: ImageOptions
  }

  interface ANSIImageOptions extends BoxOptions {
    /**
     * URL or path to PNG/GIF file. Can also be a buffer.
     */
    file: string

    /**
     * Scale cellmap down (0-1.0) from its original pixel width/height (Default: 1.0).
     */
    scale: number

    /**
     * This differs from other element's width or height in that only one
     * of them is needed: blessed will maintain the aspect ratio of the image
     * as it scales down to the proper number of cells. NOTE: PNG/GIF's are
     * always automatically shrunken to size (based on scale) if a width or
     * height is not given.
     */
    width: number | string
    height: number | string

    /**
     * Add various "density" ASCII characters over the rendering to give the
     * image more detail, similar to libcaca/libcucul (the library mplayer uses
     * to display videos in the terminal).
     */
    ascii: string

    /**
     * Whether to animate if the image is an APNG/animating GIF. If false, only
     * display the first frame or IDAT (Default: true).
     */
    animate: boolean

    /**
     * Set the speed of animation. Slower: 0.0-1.0. Faster: 1-1000. It cannot go
     * faster than 1 frame per millisecond, so 1000 is the fastest. (Default: 1.0)
     */
    speed: number

    /**
     * mem or cpu. If optimizing for memory, animation frames will be rendered to
     * bitmaps as the animation plays, using less memory. Optimizing for cpu will
     * precompile all bitmaps beforehand, which may be faster, but might also OOM
     * the process on large images. (Default: mem).
     */
    optimization: 'mem' | 'cpu'
  }

  /**
   * Convert any .png file (or .gif, see below) to an ANSI image and display it as an element.
   */
  class ANSIImageElement extends BoxElement implements IHasOptions<ANSIImageOptions> {
    constructor(options?: ANSIImageOptions)

    options: ANSIImageOptions

    /**
     * Image object from the png reader.
     */
    img: Types.TImage

    /**
     * set the image in the box to a new path.
     */
    setImage(img: string, callback: () => void): void

    /**
     * clear the current image.
     */
    clearImage(callback: () => void): void

    /**
     * Play animation if it has been paused or stopped.
     */
    play(): void

    /**
     * Pause animation.
     */
    pause(): void

    /**
     * Stop animation.
     */
    stop(): void
  }

  interface OverlayImageOptions extends BoxOptions {
    /**
     * Path to image.
     */
    file: string

    /**
     * Render the file as ANSI art instead of using w3m to overlay Internally uses the
     * ANSIImage element. See the ANSIImage element for more information/options. (Default: true).
     */
    ansi: boolean

    /**
     * Path to w3mimgdisplay. If a proper w3mimgdisplay path is not given, blessed will
     * search the entire disk for the binary.
     */
    w3m: string

    /**
     * Whether to search /usr, /bin, and /lib for w3mimgdisplay (Default: true).
     */
    search: string
  }

  /**
   * Convert any .png file (or .gif, see below) to an ANSI image and display it as an element.
   */
  class OverlayImageElement extends BoxElement implements IHasOptions<OverlayImageOptions> {
    constructor(options?: OverlayImageOptions)

    options: OverlayImageOptions

    /**
     * set the image in the box to a new path.
     */
    setImage(img: string, callback: () => void): void

    /**
     * clear the current image.
     */
    clearImage(callback: () => void): void

    /**
     * get the size of an image file in pixels.
     */
    imageSize(img: string, callback: () => void): void

    /**
     * get the size of the terminal in pixels.
     */
    termSize(callback: () => void): void

    /**
     * get the pixel to cell ratio for the terminal.
     */
    getPixelRatio(callback: () => void): void
  }

  interface VideoOptions extends BoxOptions {
    /**
     * Video to play.
     */
    file: string

    /**
     * Start time in seconds.
     */
    start: number
  }

  class VideoElement extends BoxElement implements IHasOptions<VideoOptions> {
    constructor(options?: VideoOptions)

    options: VideoOptions

    /**
     * The terminal element running mplayer or mpv.
     */
    tty: any
  }

  export type LayoutIterator = (
    el: { shrink: boolean; position: { left: number; top: number }; width: number; height: number } & BlessedElement,
    i: number
  ) => any
  interface LayoutOptions extends ElementOptions {
    /**
     * A callback which is called right before the children are iterated over to be rendered. Should return an
     * iterator callback which is called on each child element: iterator(el, i).
     */
    renderer?(this: Layout, coords: PositionCoords, i: number | undefined): LayoutIterator
    /**
     * Using the default renderer, it provides two layouts: inline, and grid. inline is the default and will render
     * akin to inline-block. grid will create an automatic grid based on element dimensions. The grid cells'
     * width and height are always determined by the largest children in the layout.
     */
    layout?: 'inline' | 'inline-block' | 'grid'
  }

  class LayoutElement extends BlessedElement implements IHasOptions<LayoutOptions> {
    constructor(options?: LayoutOptions)

    options: LayoutOptions

    /**
     * A callback which is called right before the children are iterated over to be rendered. Should return an
     * iterator callback which is called on each child element: iterator(el, i).
     */
    renderer(coords: PositionCoords, i: number | undefined): void

    /**
     * Check to see if a previous child element has been rendered and is visible on screen. This is only useful
     * for checking child elements that have already been attempted to be rendered! see the example below.
     */
    isRendered(el: BlessedElement): boolean

    /**
     * Get the last rendered and visible child element based on an index. This is useful for basing the position
     * of the current child element on the position of the last child element.
     */
    getLast(i: number): BlessedElement

    /**
     * Get the last rendered and visible child element coords based on an index. This is useful for basing the position
     * of the current child element on the position of the last child element. See the example below.
     */
    getLastCoords(i: number): PositionCoords
  }

  class Program {
    /**
     * Wrap the given text in terminal formatting codes corresponding to the given attribute
     * name. The `attr` string can be of the form `red fg` or `52 bg` where `52` is a 0-255
     * integer color number.
     */
    text(text: string, attr: string): string
  }
}

export namespace widget {
  class Terminal extends Widgets.TerminalElement {}
}

export function screen(options?: Widgets.IScreenOptions): Widgets.Screen
export function box(options?: Widgets.BoxOptions): Widgets.BoxElement
export function text(options?: Widgets.TextOptions): Widgets.TextElement
export function line(options?: Widgets.LineOptions): Widgets.LineElement
export function scrollablebox(options?: Widgets.BoxOptions): Widgets.BoxElement
export function scrollabletext(options?: Widgets.BoxOptions): Widgets.BoxElement
export function bigtext(options?: Widgets.BigTextOptions): Widgets.BigTextElement
export function list(options?: Widgets.ListOptions<Widgets.ListElementStyle>): Widgets.ListElement
export function filemanager(options?: Widgets.FileManagerOptions): Widgets.FileManagerElement
export function listtable(options?: Widgets.ListTableOptions): Widgets.ListTableElement
export function listbar(options?: Widgets.ListbarOptions): Widgets.ListbarElement
export function form<TFormData>(options?: Widgets.FormOptions): Widgets.FormElement<TFormData>
export function input(options?: Widgets.InputOptions): Widgets.InputElement
export function textarea(options?: Widgets.TextareaOptions): Widgets.TextareaElement
export function textbox(options?: Widgets.TextboxOptions): Widgets.TextboxElement
export function button(options?: Widgets.ButtonOptions): Widgets.ButtonElement
export function checkbox(options?: Widgets.CheckboxOptions): Widgets.CheckboxElement
export function radioset(options?: Widgets.RadioSetOptions): Widgets.RadioSetElement
export function radiobutton(options?: Widgets.RadioButtonOptions): Widgets.RadioButtonElement
export function table(options?: Widgets.TableOptions): Widgets.TableElement
export function prompt(options?: Widgets.PromptOptions): Widgets.PromptElement
export function question(options?: Widgets.QuestionOptions): Widgets.QuestionElement
export function message(options?: Widgets.MessageOptions): Widgets.MessageElement
export function loading(options?: Widgets.LoadingOptions): Widgets.LoadingElement
export function log(options?: Widgets.LogOptions): Widgets.Log
export function progressbar(options?: Widgets.ProgressBarOptions): Widgets.ProgressBarElement
export function program(options?: Widgets.IScreenOptions): BlessedProgram
export function terminal(options?: Widgets.TerminalOptions): Widgets.TerminalElement
export function layout(options?: Widgets.LayoutOptions): Widgets.LayoutElement
export function escape(item: any): any

type ColorRgb = [number, number.number]
export const colors: {
  match(r1: Widgets.Color | ColorRgb, g1?: number, b1?: number): number
  convert(color: Widgets.Color): number
  mixColors(c1: number, c2: number, alpha: number): number
  RGBToHex(r: number, g: number, b: number): string
  RGBToHex(hex: string): ColorRgbr
  blend(attr: number, attr2?: number, alpha?: number): number
  colorNames: {
    black: 0
    red: 1
    green: 2
    yellow: 3
    blue: 4
    magenta: 5
    cyan: 6
    white: 7
    // light
    lightblack: 8
    lightred: 9
    lightgreen: 10
    lightyellow: 11
    lightblue: 12
    lightmagenta: 13
    lightcyan: 14
    lightwhite: 15
    // bright
    brightblack: 8
    brightred: 9
    brightgreen: 10
    brightyellow: 11
    brightblue: 12
    brightmagenta: 13
    brightcyan: 14
    brightwhite: 15
    // alternate spellings
    grey: 8
    gray: 8
    lightgrey: 7
    lightgray: 7
    brightgrey: 7
    brightgray: 7
  }
}

export const unicode: Unicode

/**
 * Unicode utilities, see [[Screen#fullUnicode]]. Wide, Surrogates, and Combining.
 */
interface Unicode {
  fromCodePoint(unicode: number): string

  charWidth(str: string, i?: number): string

  strWidth(str: string): number

  isSurrogate(str: string, i?: number): boolean

  combiningTable: number[][]

  /**
   * Regexps
   */
  chars: {
    /**
     * All surrogate pair wide chars.
     */
    wide: Regexp

    /**
     * All wide chars including surrogate pairs.
     */
    all: Regexp

    /**
     * Regex to detect a surrogate pair.
     */
    surrogate: Regexp
    /**
     * Regex to find combining characters.
     */
    combining: Regexp
  }
}

//TODO

// Helpers
// All helpers reside on blessed.helpers or blessed.

// merge(a, b) - Merge objects a and b into object a.
// asort(obj) - Sort array alphabetically by name prop.
// hsort(obj) - Sort array numerically by index prop.
// findFile(start, target) - Find a file at start directory with name target.
// escape(text) - Escape content's tags to be passed into el.setContent(). Example: box.setContent('escaped tag: ' + blessed.escape('{bold}{/bold}'));
// parseTags(text) - Parse tags into SGR escape codes.
// generateTags(style, text) - Generate text tags based on style object.
// attrToBinary(style, element) - Convert style attributes to binary format.
// stripTags(text) - Strip text of tags and SGR sequences.
// cleanTags(text) - Strip text of tags, SGR escape code, and leading/trailing whitespace.
// dropUnicode(text) - Drop text of any >U+FFFF characters.


/**  terminfo/cap aliases for blessed. */

export namespace TerminalCapabilities {

/**These are the boolean capabilities:*/
export enum bools  {
  //         Variable                                      Cap-                               TCap                                  Description
  //         Booleans                                      name                               Code
  auto_left_margin = 'auto_left_margin', //                                   ['bw',                                 'bw'], //                                cub1 wraps from col‐ umn 0 to last column
  auto_right_margin = 'auto_right_margin', //                                  ['am',                                 'am'], //                                terminal has auto‐ matic margins
  back_color_erase = 'back_color_erase', //                                   ['bce',                                'ut'], //                                screen erased with background color
  can_change = 'can_change', //                                         ['ccc',                                'cc'], //                                terminal can re- define existing col‐ ors
  ceol_standout_glitch = 'ceol_standout_glitch', //                               ['xhp',                                'xs'], //                                standout not erased by overwriting (hp)
  col_addr_glitch = 'col_addr_glitch', //                                    ['xhpa',                               'YA'], //                                only positive motion for hpa/mhpa caps
  cpi_changes_res = 'cpi_changes_res', //                                    ['cpix',                               'YF'], //                                changing character pitch changes reso‐ lution
  cr_cancels_micro_mode = 'cr_cancels_micro_mode', //                              ['crxm',                               'YB'], //                                using cr turns off micro mode
  dest_tabs_magic_smso = 'dest_tabs_magic_smso', //                               ['xt',                                 'xt'], //                                tabs destructive, magic so char (t1061)
  eat_newline_glitch = 'eat_newline_glitch', //                                 ['xenl',                               'xn'], //                                newline ignored after 80 cols (con‐ cept)
  erase_overstrike = 'erase_overstrike', //                                   ['eo',                                 'eo'], //                                can erase over‐ strikes with a blank
  generic_type = 'generic_type', //                                       ['gn',                                 'gn'], //                                generic line type
  hard_copy = 'hard_copy', //                                          ['hc',                                 'hc'], //                                hardcopy terminal
  hard_cursor = 'hard_cursor', //                                        ['chts',                               'HC'], //                                cursor is hard to see
  has_meta_key = 'has_meta_key', //                                       ['km',                                 'km'], //                                Has a meta key (i.e., sets 8th-bit)
  has_print_wheel = 'has_print_wheel', //                                    ['daisy',                              'YC'], //                                printer needs opera‐ tor to change char‐ acter set
  has_status_line = 'has_status_line', //                                    ['hs',                                 'hs'], //                                has extra status line
  hue_lightness_saturation = 'hue_lightness_saturation', //                           ['hls',                                'hl'], //                                terminal uses only HLS color notation (Tektronix)
  insert_null_glitch = 'insert_null_glitch', //                                 ['in',                                 'in'], //                                insert mode distin‐ guishes nulls
  lpi_changes_res = 'lpi_changes_res', //                                    ['lpix',                               'YG'], //                                changing line pitch changes resolution
  memory_above = 'memory_above', //                                       ['da',                                 'da'], //                                display may be retained above the screen
  memory_below = 'memory_below', //                                       ['db',                                 'db'], //                                display may be retained below the screen
  move_insert_mode = 'move_insert_mode', //                                   ['mir',                                'mi'], //                                safe to move while in insert mode
  move_standout_mode = 'move_standout_mode', //                                 ['msgr',                               'ms'], //                                safe to move while in standout mode
  needs_xon_xoff = 'needs_xon_xoff', //                                     ['nxon',                               'nx'], //                                padding will not work, xon/xoff required
  no_esc_ctlc = 'no_esc_ctlc', //                                        ['xsb',                                'xb'], //                                beehive (f1=escape, f2=ctrl C)
  no_pad_char = 'no_pad_char', //                                        ['npc',                                'NP'], //                                pad character does not exist
  non_dest_scroll_region = 'non_dest_scroll_region', //                             ['ndscr',                              'ND'], //                                scrolling region is non-destructive
  non_rev_rmcup = 'non_rev_rmcup', //                                      ['nrrmc',                              'NR'], //                                smcup does not reverse rmcup
  over_strike = 'over_strike', //                                        ['os',                                 'os'], //                                terminal can over‐ strike
  prtr_silent = 'prtr_silent', //                                        ['mc5i',                               '5i'], //                                printer will not echo on screen
  row_addr_glitch = 'row_addr_glitch', //                                    ['xvpa',                               'YD'], //                                only positive motion for vpa/mvpa caps
  semi_auto_right_margin = 'semi_auto_right_margin', //                             ['sam',                                'YE'], //                                printing in last column causes cr
  status_line_esc_ok = 'status_line_esc_ok', //                                 ['eslok',                              'es'], //                                escape can be used on the status line
  tilde_glitch = 'tilde_glitch', //                                       ['hz',                                 'hz'], //                                cannot print ~'s (hazeltine)
  transparent_underline = 'transparent_underline', //                              ['ul',                                 'ul'], //                                underline character overstrikes
  xon_xoff = 'xon_xoff', //                                           ['xon',                                'xo']  //                                terminal uses xon/xoff handshaking
}

/** These are the numeric capabilities: */
export enum numbers {
  //         Variable                                      Cap-                               TCap                                  Description
  //          Numeric                                      name                               Code
  columns = 'columns', //                                            ['cols',                               'co'], //                                number of columns in a line
  init_tabs = 'init_tabs', //                                          ['it',                                 'it'], //                                tabs initially every # spaces
  label_height = 'label_height', //                                       ['lh',                                 'lh'], //                                rows in each label
  label_width = 'label_width', //                                        ['lw',                                 'lw'], //                                columns in each label
  lines = 'lines', //                                              ['lines',                              'li'], //                                number of lines on screen or page
  lines_of_memory = 'lines_of_memory', //                                    ['lm',                                 'lm'], //                                lines of memory if > line. 0 means varies
  magic_cookie_glitch = 'magic_cookie_glitch', //                                ['xmc',                                'sg'], //                                number of blank characters left by smso or rmso
  max_attributes = 'max_attributes', //                                     ['ma',                                 'ma'], //                                maximum combined attributes terminal can handle
  max_colors = 'max_colors', //                                         ['colors',                             'Co'], //                                maximum number of colors on screen
  max_pairs = 'max_pairs', //                                          ['pairs',                              'pa'], //                                maximum number of color-pairs on the screen
  maximum_windows = 'maximum_windows', //                                    ['wnum',                               'MW'], //                                maximum number of defineable windows
  no_color_video = 'no_color_video', //                                     ['ncv',                                'NC'], //                                video attributes that cannot be used with colors
  num_labels = 'num_labels', //                                         ['nlab',                               'Nl'], //                                number of labels on screen
  padding_baud_rate = 'padding_baud_rate', //                                  ['pb',                                 'pb'], //                                lowest baud rate where padding needed
  virtual_terminal = 'virtual_terminal', //                                   ['vt',                                 'vt'], //                                virtual terminal number (CB/unix)
  width_status_line = 'width_status_line', //                                  ['wsl',                                'ws'], //                                number of columns in status line

  // The  following  numeric  capabilities  are present in the SVr4.0 term structure, but are not yet documented in the man page.  They came in with
  // SVr4's printer support.


  //         Variable                                      Cap-                               TCap                                  Description
  //          Numeric                                      name                               Code
  bit_image_entwining = 'bit_image_entwining', //                                ['bitwin',                             'Yo'], //                                number of passes for each bit-image row
  bit_image_type = 'bit_image_type', //                                     ['bitype',                             'Yp'], //                                type of bit-image device
  buffer_capacity = 'buffer_capacity', //                                    ['bufsz',                              'Ya'], //                                numbers of bytes buffered before printing
  buttons = 'buttons', //                                            ['btns',                               'BT'], //                                number of buttons on mouse
  dot_horz_spacing = 'dot_horz_spacing', //                                   ['spinh',                              'Yc'], //                                spacing of dots hor‐ izontally in dots per inch
  dot_vert_spacing = 'dot_vert_spacing', //                                   ['spinv',                              'Yb'], //                                spacing of pins ver‐ tically in pins per inch
  max_micro_address = 'max_micro_address', //                                  ['maddr',                              'Yd'], //                                maximum value in micro_..._address
  max_micro_jump = 'max_micro_jump', //                                     ['mjump',                              'Ye'], //                                maximum value in parm_..._micro
  micro_col_size = 'micro_col_size', //                                     ['mcs',                                'Yf'], //                                character step size when in micro mode
  micro_line_size = 'micro_line_size', //                                    ['mls',                                'Yg'], //                                line step size when in micro mode
  number_of_pins = 'number_of_pins', //                                     ['npins',                              'Yh'], //                                numbers of pins in print-head
  output_res_char = 'output_res_char', //                                    ['orc',                                'Yi'], //                                horizontal resolu‐ tion in units per line
  output_res_horz_inch = 'output_res_horz_inch', //                               ['orhi',                               'Yk'], //                                horizontal resolu‐ tion in units per inch
  output_res_line = 'output_res_line', //                                    ['orl',                                'Yj'], //                                vertical resolution in units per line
  output_res_vert_inch = 'output_res_vert_inch', //                               ['orvi',                               'Yl'], //                                vertical resolution in units per inch
  print_rate = 'print_rate', //                                         ['cps',                                'Ym'], //                                print rate in char‐ acters per second
  wide_char_size = 'wide_char_size', //                                     ['widcs',                              'Yn']  //                                character step size when in double wide mode
}

/**  These are the string capabilities: */
export enum strings {
  //         Variable                                    Cap-                             TCap                                   Description
  //          String                                     name                             Code
  acs_chars = 'acs_chars', //                                        ['acsc',                             'ac'], //                              graphics charset pairs, based on vt100
  back_tab = 'back_tab', //                                         ['cbt',                              'bt'], //                              back tab (P)
  bell = 'bell', //                                             ['bel',                              'bl'], //                              audible signal (bell) (P)
  carriage_return = 'carriage_return', //                                  ['cr',                               'cr'], //                              carriage return (P*) (P*)
  change_char_pitch = 'change_char_pitch', //                                ['cpi',                              'ZA'], //                              Change number of characters per inch to #1
  change_line_pitch = 'change_line_pitch', //                                ['lpi',                              'ZB'], //                              Change number of lines per inch to #1
  change_res_horz = 'change_res_horz', //                                  ['chr',                              'ZC'], //                              Change horizontal resolution to #1
  change_res_vert = 'change_res_vert', //                                  ['cvr',                              'ZD'], //                              Change vertical res‐ olution to #1
  change_scroll_region = 'change_scroll_region', //                             ['csr',                              'cs'], //                              change region to line #1 to line #2 (P)
  char_padding = 'char_padding', //                                     ['rmp',                              'rP'], //                              like ip but when in insert mode
  clear_all_tabs = 'clear_all_tabs', //                                   ['tbc',                              'ct'], //                              clear all tab stops (P)
  clear_margins = 'clear_margins', //                                    ['mgc',                              'MC'], //                              clear right and left soft margins
  clear_screen = 'clear_screen', //                                     ['clear',                            'cl'], //                              clear screen and home cursor (P*)
  clr_bol = 'clr_bol', //                                          ['el1',                              'cb'], //                              Clear to beginning of line
  clr_eol = 'clr_eol', //                                          ['el',                               'ce'], //                              clear to end of line (P)
  clr_eos = 'clr_eos', //                                          ['ed',                               'cd'], //                              clear to end of screen (P*)
  column_address = 'column_address', //                                   ['hpa',                              'ch'], //                              horizontal position #1, absolute (P)
  command_character = 'command_character', //                                ['cmdch',                            'CC'], //                              terminal settable cmd character in prototype !?
  create_window = 'create_window', //                                    ['cwin',                             'CW'], //                              define a window #1 from #2,#3 to #4,#5
  cursor_address = 'cursor_address', //                                   ['cup',                              'cm'], //                              move to row #1 col‐ umns #2
  cursor_down = 'cursor_down', //                                      ['cud1',                             'do'], //                              down one line
  cursor_home = 'cursor_home', //                                      ['home',                             'ho'], //                              home cursor (if no cup)
  cursor_invisible = 'cursor_invisible', //                                 ['civis',                            'vi'], //                              make cursor invisi‐ ble
  cursor_left = 'cursor_left', //                                      ['cub1',                             'le'], //                              move left one space
  cursor_mem_address = 'cursor_mem_address', //                               ['mrcup',                            'CM'], //                              memory relative cur‐ sor addressing, move to row #1 columns #2
  cursor_normal = 'cursor_normal', //                                    ['cnorm',                            've'], //                              make cursor appear normal (undo civis/cvvis)
  cursor_right = 'cursor_right', //                                     ['cuf1',                             'nd'], //                              non-destructive space (move right one space)
  cursor_to_ll = 'cursor_to_ll', //                                     ['ll',                               'll'], //                              last line, first column (if no cup)
  cursor_up = 'cursor_up', //                                        ['cuu1',                             'up'], //                              up one line
  cursor_visible = 'cursor_visible', //                                   ['cvvis',                            'vs'], //                              make cursor very visible
  define_char = 'define_char', //                                      ['defc',                             'ZE'], //                              Define a character #1, #2 dots wide, descender #3
  delete_character = 'delete_character', //                                 ['dch1',                             'dc'], //                              delete character (P*)
  delete_line = 'delete_line', //                                      ['dl1',                              'dl'], //                              delete line (P*)
  dial_phone = 'dial_phone', //                                       ['dial',                             'DI'], //                              dial number #1
  dis_status_line = 'dis_status_line', //                                  ['dsl',                              'ds'], //                              disable status line
  display_clock = 'display_clock', //                                    ['dclk',                             'DK'], //                              display clock
  down_half_line = 'down_half_line', //                                   ['hd',                               'hd'], //                              half a line down
  ena_acs = 'ena_acs', //                                          ['enacs',                            'eA'], //                              enable alternate char set
  enter_alt_charset_mode = 'enter_alt_charset_mode', //                           ['smacs',                            'as'], //                              start alternate character set (P)
  enter_am_mode = 'enter_am_mode', //                                    ['smam',                             'SA'], //                              turn on automatic margins
  enter_blink_mode = 'enter_blink_mode', //                                 ['blink',                            'mb'], //                              turn on blinking
  enter_bold_mode = 'enter_bold_mode', //                                  ['bold',                             'md'], //                              turn on bold (extra bright) mode
  enter_ca_mode = 'enter_ca_mode', //                                    ['smcup',                            'ti'], //                              string to start pro‐ grams using cup
  enter_delete_mode = 'enter_delete_mode', //                                ['smdc',                             'dm'], //                              enter delete mode
  enter_dim_mode = 'enter_dim_mode', //                                   ['dim',                              'mh'], //                              turn on half-bright mode
  enter_doublewide_mode = 'enter_doublewide_mode', //                            ['swidm',                            'ZF'], //                              Enter double-wide mode
  enter_draft_quality = 'enter_draft_quality', //                              ['sdrfq',                            'ZG'], //                              Enter draft-quality mode
  enter_insert_mode = 'enter_insert_mode', //                                ['smir',                             'im'], //                              enter insert mode
  enter_italics_mode = 'enter_italics_mode', //                               ['sitm',                             'ZH'], //                              Enter italic mode
  enter_leftward_mode = 'enter_leftward_mode', //                              ['slm',                              'ZI'], //                              Start leftward car‐ riage motion
  enter_micro_mode = 'enter_micro_mode', //                                 ['smicm',                            'ZJ'], //                              Start micro-motion mode
  enter_near_letter_quality = 'enter_near_letter_quality', //                        ['snlq',                             'ZK'], //                              Enter NLQ mode
  enter_normal_quality = 'enter_normal_quality', //                             ['snrmq',                            'ZL'], //                              Enter normal-quality mode
  enter_protected_mode = 'enter_protected_mode', //                             ['prot',                             'mp'], //                              turn on protected mode
  enter_reverse_mode = 'enter_reverse_mode', //                               ['rev',                              'mr'], //                              turn on reverse video mode
  enter_secure_mode = 'enter_secure_mode', //                                ['invis',                            'mk'], //                              turn on blank mode (characters invisi‐ ble)
  enter_shadow_mode = 'enter_shadow_mode', //                                ['sshm',                             'ZM'], //                              Enter shadow-print mode
  enter_standout_mode = 'enter_standout_mode', //                              ['smso',                             'so'], //                              begin standout mode
  enter_subscript_mode = 'enter_subscript_mode', //                             ['ssubm',                            'ZN'], //                              Enter subscript mode
  enter_superscript_mode = 'enter_superscript_mode', //                           ['ssupm',                            'ZO'], //                              Enter superscript mode
  enter_underline_mode = 'enter_underline_mode', //                             ['smul',                             'us'], //                              begin underline mode
  enter_upward_mode = 'enter_upward_mode', //                                ['sum',                              'ZP'], //                              Start upward car‐ riage motion
  enter_xon_mode = 'enter_xon_mode', //                                   ['smxon',                            'SX'], //                              turn on xon/xoff handshaking
  erase_chars = 'erase_chars', //                                      ['ech',                              'ec'], //                              erase #1 characters (P)
  exit_alt_charset_mode = 'exit_alt_charset_mode', //                            ['rmacs',                            'ae'], //                              end alternate char‐ acter set (P)
  exit_am_mode = 'exit_am_mode', //                                     ['rmam',                             'RA'], //                              turn off automatic margins
  exit_attribute_mode = 'exit_attribute_mode', //                              ['sgr0',                             'me'], //                              turn off all attributes
  exit_ca_mode = 'exit_ca_mode', //                                     ['rmcup',                            'te'], //                              strings to end pro‐ grams using cup
  exit_delete_mode = 'exit_delete_mode', //                                 ['rmdc',                             'ed'], //                              end delete mode
  exit_doublewide_mode = 'exit_doublewide_mode', //                             ['rwidm',                            'ZQ'], //                              End double-wide mode
  exit_insert_mode = 'exit_insert_mode', //                                 ['rmir',                             'ei'], //                              exit insert mode
  exit_italics_mode = 'exit_italics_mode', //                                ['ritm',                             'ZR'], //                              End italic mode
  exit_leftward_mode = 'exit_leftward_mode', //                               ['rlm',                              'ZS'], //                              End left-motion mode


  exit_micro_mode = 'exit_micro_mode', //                                  ['rmicm',                            'ZT'], //                              End micro-motion mode
  exit_shadow_mode = 'exit_shadow_mode', //                                 ['rshm',                             'ZU'], //                              End shadow-print mode
  exit_standout_mode = 'exit_standout_mode', //                               ['rmso',                             'se'], //                              exit standout mode
  exit_subscript_mode = 'exit_subscript_mode', //                              ['rsubm',                            'ZV'], //                              End subscript mode
  exit_superscript_mode = 'exit_superscript_mode', //                            ['rsupm',                            'ZW'], //                              End superscript mode
  exit_underline_mode = 'exit_underline_mode', //                              ['rmul',                             'ue'], //                              exit underline mode
  exit_upward_mode = 'exit_upward_mode', //                                 ['rum',                              'ZX'], //                              End reverse charac‐ ter motion
  exit_xon_mode = 'exit_xon_mode', //                                    ['rmxon',                            'RX'], //                              turn off xon/xoff handshaking
  fixed_pause = 'fixed_pause', //                                      ['pause',                            'PA'], //                              pause for 2-3 sec‐ onds
  flash_hook = 'flash_hook', //                                       ['hook',                             'fh'], //                              flash switch hook
  flash_screen = 'flash_screen', //                                     ['flash',                            'vb'], //                              visible bell (may not move cursor)
  form_feed = 'form_feed', //                                        ['ff',                               'ff'], //                              hardcopy terminal page eject (P*)
  from_status_line = 'from_status_line', //                                 ['fsl',                              'fs'], //                              return from status line
  goto_window = 'goto_window', //                                      ['wingo',                            'WG'], //                              go to window #1
  hangup = 'hangup', //                                           ['hup',                              'HU'], //                              hang-up phone
  init_1string = 'init_1string', //                                     ['is1',                              'i1'], //                              initialization string
  init_2string = 'init_2string', //                                     ['is2',                              'is'], //                              initialization string
  init_3string = 'init_3string', //                                     ['is3',                              'i3'], //                              initialization string
  init_file = 'init_file', //                                        ['if',                               'if'], //                              name of initializa‐ tion file
  init_prog = 'init_prog', //                                        ['iprog',                            'iP'], //                              path name of program for initialization
  initialize_color = 'initialize_color', //                                 ['initc',                            'Ic'], //                              initialize color #1 to (#2,#3,#4)
  initialize_pair = 'initialize_pair', //                                  ['initp',                            'Ip'], //                              Initialize color pair #1 to fg=(#2,#3,#4), bg=(#5,#6,#7)
  insert_character = 'insert_character', //                                 ['ich1',                             'ic'], //                              insert character (P)
  insert_line = 'insert_line', //                                      ['il1',                              'al'], //                              insert line (P*)
  insert_padding = 'insert_padding', //                                   ['ip',                               'ip'], //                              insert padding after inserted character
  key_a1 = 'key_a1', //                                           ['ka1',                              'K1'], //                              upper left of keypad
  key_a3 = 'key_a3', //                                           ['ka3',                              'K3'], //                              upper right of key‐ pad
  key_b2 = 'key_b2', //                                           ['kb2',                              'K2'], //                              center of keypad
  key_backspace = 'key_backspace', //                                    ['kbs',                              'kb'], //                              backspace key
  key_beg = 'key_beg', //                                          ['kbeg',                             '@1'], //                              begin key
  key_btab = 'key_btab', //                                         ['kcbt',                             'kB'], //                              back-tab key
  key_c1 = 'key_c1', //                                           ['kc1',                              'K4'], //                              lower left of keypad
  key_c3 = 'key_c3', //                                           ['kc3',                              'K5'], //                              lower right of key‐ pad
  key_cancel = 'key_cancel', //                                       ['kcan',                             '@2'], //                              cancel key
  key_catab = 'key_catab', //                                        ['ktbc',                             'ka'], //                              clear-all-tabs key
  key_clear = 'key_clear', //                                        ['kclr',                             'kC'], //                              clear-screen or erase key
  key_close = 'key_close', //                                        ['kclo',                             '@3'], //                              close key
  key_command = 'key_command', //                                      ['kcmd',                             '@4'], //                              command key
  key_copy = 'key_copy', //                                         ['kcpy',                             '@5'], //                              copy key
  key_create = 'key_create', //                                       ['kcrt',                             '@6'], //                              create key
  key_ctab = 'key_ctab', //                                         ['kctab',                            'kt'], //                              clear-tab key
  key_dc = 'key_dc', //                                           ['kdch1',                            'kD'], //                              delete-character key
  key_dl = 'key_dl', //                                           ['kdl1',                             'kL'], //                              delete-line key
  key_down = 'key_down', //                                         ['kcud1',                            'kd'], //                              down-arrow key

  key_eic = 'key_eic', //                                          ['krmir',                            'kM'], //                              sent by rmir or smir in insert mode
  key_end = 'key_end', //                                          ['kend',                             '@7'], //                              end key
  key_enter = 'key_enter', //                                        ['kent',                             '@8'], //                              enter/send key
  key_eol = 'key_eol', //                                          ['kel',                              'kE'], //                              clear-to-end-of-line key
  key_eos = 'key_eos', //                                          ['ked',                              'kS'], //                              clear-to-end-of- screen key
  key_exit = 'key_exit', //                                         ['kext',                             '@9'], //                              exit key
  key_f0 = 'key_f0', //                                           ['kf0',                              'k0'], //                              F0 function key
  key_f1 = 'key_f1', //                                           ['kf1',                              'k1'], //                              F1 function key
  key_f10 = 'key_f10', //                                          ['kf10',                             'k;'], //                              F10 function key
  key_f11 = 'key_f11', //                                          ['kf11',                             'F1'], //                              F11 function key
  key_f12 = 'key_f12', //                                          ['kf12',                             'F2'], //                              F12 function key
  key_f13 = 'key_f13', //                                          ['kf13',                             'F3'], //                              F13 function key
  key_f14 = 'key_f14', //                                          ['kf14',                             'F4'], //                              F14 function key
  key_f15 = 'key_f15', //                                          ['kf15',                             'F5'], //                              F15 function key
  key_f16 = 'key_f16', //                                          ['kf16',                             'F6'], //                              F16 function key
  key_f17 = 'key_f17', //                                          ['kf17',                             'F7'], //                              F17 function key
  key_f18 = 'key_f18', //                                          ['kf18',                             'F8'], //                              F18 function key
  key_f19 = 'key_f19', //                                          ['kf19',                             'F9'], //                              F19 function key
  key_f2 = 'key_f2', //                                           ['kf2',                              'k2'], //                              F2 function key
  key_f20 = 'key_f20', //                                          ['kf20',                             'FA'], //                              F20 function key
  key_f21 = 'key_f21', //                                          ['kf21',                             'FB'], //                              F21 function key
  key_f22 = 'key_f22', //                                          ['kf22',                             'FC'], //                              F22 function key
  key_f23 = 'key_f23', //                                          ['kf23',                             'FD'], //                              F23 function key
  key_f24 = 'key_f24', //                                          ['kf24',                             'FE'], //                              F24 function key
  key_f25 = 'key_f25', //                                          ['kf25',                             'FF'], //                              F25 function key
  key_f26 = 'key_f26', //                                          ['kf26',                             'FG'], //                              F26 function key
  key_f27 = 'key_f27', //                                          ['kf27',                             'FH'], //                              F27 function key
  key_f28 = 'key_f28', //                                          ['kf28',                             'FI'], //                              F28 function key
  key_f29 = 'key_f29', //                                          ['kf29',                             'FJ'], //                              F29 function key
  key_f3 = 'key_f3', //                                           ['kf3',                              'k3'], //                              F3 function key
  key_f30 = 'key_f30', //                                          ['kf30',                             'FK'], //                              F30 function key
  key_f31 = 'key_f31', //                                          ['kf31',                             'FL'], //                              F31 function key
  key_f32 = 'key_f32', //                                          ['kf32',                             'FM'], //                              F32 function key
  key_f33 = 'key_f33', //                                          ['kf33',                             'FN'], //                              F33 function key
  key_f34 = 'key_f34', //                                          ['kf34',                             'FO'], //                              F34 function key
  key_f35 = 'key_f35', //                                          ['kf35',                             'FP'], //                              F35 function key
  key_f36 = 'key_f36', //                                          ['kf36',                             'FQ'], //                              F36 function key
  key_f37 = 'key_f37', //                                          ['kf37',                             'FR'], //                              F37 function key
  key_f38 = 'key_f38', //                                          ['kf38',                             'FS'], //                              F38 function key
  key_f39 = 'key_f39', //                                          ['kf39',                             'FT'], //                              F39 function key
  key_f4 = 'key_f4', //                                           ['kf4',                              'k4'], //                              F4 function key
  key_f40 = 'key_f40', //                                          ['kf40',                             'FU'], //                              F40 function key
  key_f41 = 'key_f41', //                                          ['kf41',                             'FV'], //                              F41 function key
  key_f42 = 'key_f42', //                                          ['kf42',                             'FW'], //                              F42 function key
  key_f43 = 'key_f43', //                                          ['kf43',                             'FX'], //                              F43 function key
  key_f44 = 'key_f44', //                                          ['kf44',                             'FY'], //                              F44 function key
  key_f45 = 'key_f45', //                                          ['kf45',                             'FZ'], //                              F45 function key
  key_f46 = 'key_f46', //                                          ['kf46',                             'Fa'], //                              F46 function key
  key_f47 = 'key_f47', //                                          ['kf47',                             'Fb'], //                              F47 function key
  key_f48 = 'key_f48', //                                          ['kf48',                             'Fc'], //                              F48 function key
  key_f49 = 'key_f49', //                                          ['kf49',                             'Fd'], //                              F49 function key
  key_f5 = 'key_f5', //                                           ['kf5',                              'k5'], //                              F5 function key
  key_f50 = 'key_f50', //                                          ['kf50',                             'Fe'], //                              F50 function key
  key_f51 = 'key_f51', //                                          ['kf51',                             'Ff'], //                              F51 function key
  key_f52 = 'key_f52', //                                          ['kf52',                             'Fg'], //                              F52 function key
  key_f53 = 'key_f53', //                                          ['kf53',                             'Fh'], //                              F53 function key
  key_f54 = 'key_f54', //                                          ['kf54',                             'Fi'], //                              F54 function key
  key_f55 = 'key_f55', //                                          ['kf55',                             'Fj'], //                              F55 function key
  key_f56 = 'key_f56', //                                          ['kf56',                             'Fk'], //                              F56 function key
  key_f57 = 'key_f57', //                                          ['kf57',                             'Fl'], //                              F57 function key
  key_f58 = 'key_f58', //                                          ['kf58',                             'Fm'], //                              F58 function key
  key_f59 = 'key_f59', //                                          ['kf59',                             'Fn'], //                              F59 function key

  key_f6 = 'key_f6', //                                           ['kf6',                              'k6'], //                              F6 function key
  key_f60 = 'key_f60', //                                          ['kf60',                             'Fo'], //                              F60 function key
  key_f61 = 'key_f61', //                                          ['kf61',                             'Fp'], //                              F61 function key
  key_f62 = 'key_f62', //                                          ['kf62',                             'Fq'], //                              F62 function key
  key_f63 = 'key_f63', //                                          ['kf63',                             'Fr'], //                              F63 function key
  key_f7 = 'key_f7', //                                           ['kf7',                              'k7'], //                              F7 function key
  key_f8 = 'key_f8', //                                           ['kf8',                              'k8'], //                              F8 function key
  key_f9 = 'key_f9', //                                           ['kf9',                              'k9'], //                              F9 function key
  key_find = 'key_find', //                                         ['kfnd',                             '@0'], //                              find key
  key_help = 'key_help', //                                         ['khlp',                             '%1'], //                              help key
  key_home = 'key_home', //                                         ['khome',                            'kh'], //                              home key
  key_ic = 'key_ic', //                                           ['kich1',                            'kI'], //                              insert-character key
  key_il = 'key_il', //                                           ['kil1',                             'kA'], //                              insert-line key
  key_left = 'key_left', //                                         ['kcub1',                            'kl'], //                              left-arrow key
  key_ll = 'key_ll', //                                           ['kll',                              'kH'], //                              lower-left key (home down)
  key_mark = 'key_mark', //                                         ['kmrk',                             '%2'], //                              mark key
  key_message = 'key_message', //                                      ['kmsg',                             '%3'], //                              message key
  key_move = 'key_move', //                                         ['kmov',                             '%4'], //                              move key
  key_next = 'key_next', //                                         ['knxt',                             '%5'], //                              next key
  key_npage = 'key_npage', //                                        ['knp',                              'kN'], //                              next-page key
  key_open = 'key_open', //                                         ['kopn',                             '%6'], //                              open key
  key_options = 'key_options', //                                      ['kopt',                             '%7'], //                              options key
  key_ppage = 'key_ppage', //                                        ['kpp',                              'kP'], //                              previous-page key
  key_previous = 'key_previous', //                                     ['kprv',                             '%8'], //                              previous key
  key_print = 'key_print', //                                        ['kprt',                             '%9'], //                              print key
  key_redo = 'key_redo', //                                         ['krdo',                             '%0'], //                              redo key
  key_reference = 'key_reference', //                                    ['kref',                             '&1'], //                              reference key
  key_refresh = 'key_refresh', //                                      ['krfr',                             '&2'], //                              refresh key
  key_replace = 'key_replace', //                                      ['krpl',                             '&3'], //                              replace key
  key_restart = 'key_restart', //                                      ['krst',                             '&4'], //                              restart key
  key_resume = 'key_resume', //                                       ['kres',                             '&5'], //                              resume key
  key_right = 'key_right', //                                        ['kcuf1',                            'kr'], //                              right-arrow key
  key_save = 'key_save', //                                         ['ksav',                             '&6'], //                              save key
  key_sbeg = 'key_sbeg', //                                         ['kBEG',                             '&9'], //                              shifted begin key
  key_scancel = 'key_scancel', //                                      ['kCAN',                             '&0'], //                              shifted cancel key
  key_scommand = 'key_scommand', //                                     ['kCMD',                             '*1'], //                              shifted command key
  key_scopy = 'key_scopy', //                                        ['kCPY',                             '*2'], //                              shifted copy key
  key_screate = 'key_screate', //                                      ['kCRT',                             '*3'], //                              shifted create key
  key_sdc = 'key_sdc', //                                          ['kDC',                              '*4'], //                              shifted delete-char‐ acter key
  key_sdl = 'key_sdl', //                                          ['kDL',                              '*5'], //                              shifted delete-line key
  key_select = 'key_select', //                                       ['kslt',                             '*6'], //                              select key
  key_send = 'key_send', //                                         ['kEND',                             '*7'], //                              shifted end key
  key_seol = 'key_seol', //                                         ['kEOL',                             '*8'], //                              shifted clear-to- end-of-line key
  key_sexit = 'key_sexit', //                                        ['kEXT',                             '*9'], //                              shifted exit key
  key_sf = 'key_sf', //                                           ['kind',                             'kF'], //                              scroll-forward key
  key_sfind = 'key_sfind', //                                        ['kFND',                             '*0'], //                              shifted find key
  key_shelp = 'key_shelp', //                                        ['kHLP',                             '#1'], //                              shifted help key
  key_shome = 'key_shome', //                                        ['kHOM',                             '#2'], //                              shifted home key
  key_sic = 'key_sic', //                                          ['kIC',                              '#3'], //                              shifted insert-char‐ acter key
  key_sleft = 'key_sleft', //                                        ['kLFT',                             '#4'], //                              shifted left-arrow key
  key_smessage = 'key_smessage', //                                     ['kMSG',                             '%a'], //                              shifted message key
  key_smove = 'key_smove', //                                        ['kMOV',                             '%b'], //                              shifted move key
  key_snext = 'key_snext', //                                        ['kNXT',                             '%c'], //                              shifted next key
  key_soptions = 'key_soptions', //                                     ['kOPT',                             '%d'], //                              shifted options key
  key_sprevious = 'key_sprevious', //                                    ['kPRV',                             '%e'], //                              shifted previous key
  key_sprint = 'key_sprint', //                                       ['kPRT',                             '%f'], //                              shifted print key
  key_sr = 'key_sr', //                                           ['kri',                              'kR'], //                              scroll-backward key
  key_sredo = 'key_sredo', //                                        ['kRDO',                             '%g'], //                              shifted redo key
  key_sreplace = 'key_sreplace', //                                     ['kRPL',                             '%h'], //                              shifted replace key

  key_sright = 'key_sright', //                                       ['kRIT',                             '%i'], //                              shifted right-arrow key
  key_srsume = 'key_srsume', //                                       ['kRES',                             '%j'], //                              shifted resume key
  key_ssave = 'key_ssave', //                                        ['kSAV',                             '!1'], //                              shifted save key
  key_ssuspend = 'key_ssuspend', //                                     ['kSPD',                             '!2'], //                              shifted suspend key
  key_stab = 'key_stab', //                                         ['khts',                             'kT'], //                              set-tab key
  key_sundo = 'key_sundo', //                                        ['kUND',                             '!3'], //                              shifted undo key
  key_suspend = 'key_suspend', //                                      ['kspd',                             '&7'], //                              suspend key
  key_undo = 'key_undo', //                                         ['kund',                             '&8'], //                              undo key
  key_up = 'key_up', //                                           ['kcuu1',                            'ku'], //                              up-arrow key
  keypad_local = 'keypad_local', //                                     ['rmkx',                             'ke'], //                              leave 'key‐ board_transmit' mode
  keypad_xmit = 'keypad_xmit', //                                      ['smkx',                             'ks'], //                              enter 'key‐ board_transmit' mode
  lab_f0 = 'lab_f0', //                                           ['lf0',                              'l0'], //                              label on function key f0 if not f0
  lab_f1 = 'lab_f1', //                                           ['lf1',                              'l1'], //                              label on function key f1 if not f1
  lab_f10 = 'lab_f10', //                                          ['lf10',                             'la'], //                              label on function key f10 if not f10
  lab_f2 = 'lab_f2', //                                           ['lf2',                              'l2'], //                              label on function key f2 if not f2
  lab_f3 = 'lab_f3', //                                           ['lf3',                              'l3'], //                              label on function key f3 if not f3
  lab_f4 = 'lab_f4', //                                           ['lf4',                              'l4'], //                              label on function key f4 if not f4
  lab_f5 = 'lab_f5', //                                           ['lf5',                              'l5'], //                              label on function key f5 if not f5
  lab_f6 = 'lab_f6', //                                           ['lf6',                              'l6'], //                              label on function key f6 if not f6
  lab_f7 = 'lab_f7', //                                           ['lf7',                              'l7'], //                              label on function key f7 if not f7
  lab_f8 = 'lab_f8', //                                           ['lf8',                              'l8'], //                              label on function key f8 if not f8
  lab_f9 = 'lab_f9', //                                           ['lf9',                              'l9'], //                              label on function key f9 if not f9
  label_format = 'label_format', //                                     ['fln',                              'Lf'], //                              label format
  label_off = 'label_off', //                                        ['rmln',                             'LF'], //                              turn off soft labels
  label_on = 'label_on', //                                         ['smln',                             'LO'], //                              turn on soft labels
  meta_off = 'meta_off', //                                         ['rmm',                              'mo'], //                              turn off meta mode
  meta_on = 'meta_on', //                                          ['smm',                              'mm'], //                              turn on meta mode (8th-bit on)
  micro_column_address = 'micro_column_address', //                             ['mhpa',                             'ZY'], //                              Like column_address in micro mode
  micro_down = 'micro_down', //                                       ['mcud1',                            'ZZ'], //                              Like cursor_down in micro mode
  micro_left = 'micro_left', //                                       ['mcub1',                            'Za'], //                              Like cursor_left in micro mode
  micro_right = 'micro_right', //                                      ['mcuf1',                            'Zb'], //                              Like cursor_right in micro mode
  micro_row_address = 'micro_row_address', //                                ['mvpa',                             'Zc'], //                              Like row_address #1 in micro mode
  micro_up = 'micro_up', //                                         ['mcuu1',                            'Zd'], //                              Like cursor_up in micro mode
  newline = 'newline', //                                          ['nel',                              'nw'], //                              newline (behave like cr followed by lf)
  order_of_pins = 'order_of_pins', //                                    ['porder',                           'Ze'], //                              Match software bits to print-head pins
  orig_colors = 'orig_colors', //                                      ['oc',                               'oc'], //                              Set all color pairs to the original ones
  orig_pair = 'orig_pair', //                                        ['op',                               'op'], //                              Set default pair to its original value
  pad_char = 'pad_char', //                                         ['pad',                              'pc'], //                              padding char (instead of null)


  parm_dch = 'parm_dch', //                                         ['dch',                              'DC'], //                              delete #1 characters (P*)
  parm_delete_line = 'parm_delete_line', //                                 ['dl',                               'DL'], //                              delete #1 lines (P*)
  parm_down_cursor = 'parm_down_cursor', //                                 ['cud',                              'DO'], //                              down #1 lines (P*)
  parm_down_micro = 'parm_down_micro', //                                  ['mcud',                             'Zf'], //                              Like parm_down_cur‐ sor in micro mode
  parm_ich = 'parm_ich', //                                         ['ich',                              'IC'], //                              insert #1 characters (P*)
  parm_index = 'parm_index', //                                       ['indn',                             'SF'], //                              scroll forward #1 lines (P)
  parm_insert_line = 'parm_insert_line', //                                 ['il',                               'AL'], //                              insert #1 lines (P*)
  parm_left_cursor = 'parm_left_cursor', //                                 ['cub',                              'LE'], //                              move #1 characters to the left (P)
  parm_left_micro = 'parm_left_micro', //                                  ['mcub',                             'Zg'], //                              Like parm_left_cur‐ sor in micro mode
  parm_right_cursor = 'parm_right_cursor', //                                ['cuf',                              'RI'], //                              move #1 characters to the right (P*)
  parm_right_micro = 'parm_right_micro', //                                 ['mcuf',                             'Zh'], //                              Like parm_right_cur‐ sor in micro mode
  parm_rindex = 'parm_rindex', //                                      ['rin',                              'SR'], //                              scroll back #1 lines (P)
  parm_up_cursor = 'parm_up_cursor', //                                   ['cuu',                              'UP'], //                              up #1 lines (P*)
  parm_up_micro = 'parm_up_micro', //                                    ['mcuu',                             'Zi'], //                              Like parm_up_cursor in micro mode
  pkey_key = 'pkey_key', //                                         ['pfkey',                            'pk'], //                              program function key #1 to type string #2
  pkey_local = 'pkey_local', //                                       ['pfloc',                            'pl'], //                              program function key #1 to execute string #2
  pkey_xmit = 'pkey_xmit', //                                        ['pfx',                              'px'], //                              program function key #1 to transmit string #2
  plab_norm = 'plab_norm', //                                        ['pln',                              'pn'], //                              program label #1 to show string #2
  print_screen = 'print_screen', //                                     ['mc0',                              'ps'], //                              print contents of screen
  prtr_non = 'prtr_non', //                                         ['mc5p',                             'pO'], //                              turn on printer for #1 bytes
  prtr_off = 'prtr_off', //                                         ['mc4',                              'pf'], //                              turn off printer
  prtr_on = 'prtr_on', //                                          ['mc5',                              'po'], //                              turn on printer
  pulse = 'pulse', //                                            ['pulse',                            'PU'], //                              select pulse dialing
  quick_dial = 'quick_dial', //                                       ['qdial',                            'QD'], //                              dial number #1 with‐ out checking
  remove_clock = 'remove_clock', //                                     ['rmclk',                            'RC'], //                              remove clock
  repeat_char = 'repeat_char', //                                      ['rep',                              'rp'], //                              repeat char #1 #2 times (P*)
  req_for_input = 'req_for_input', //                                    ['rfi',                              'RF'], //                              send next input char (for ptys)
  reset_1string = 'reset_1string', //                                    ['rs1',                              'r1'], //                              reset string
  reset_2string = 'reset_2string', //                                    ['rs2',                              'r2'], //                              reset string
  reset_3string = 'reset_3string', //                                    ['rs3',                              'r3'], //                              reset string
  reset_file = 'reset_file', //                                       ['rf',                               'rf'], //                              name of reset file
  restore_cursor = 'restore_cursor', //                                   ['rc',                               'rc'], //                              restore cursor to position of last save_cursor
  row_address = 'row_address', //                                      ['vpa',                              'cv'], //                              vertical position #1 absolute (P)
  save_cursor = 'save_cursor', //                                      ['sc',                               'sc'], //                              save current cursor position (P)
  scroll_forward = 'scroll_forward', //                                   ['ind',                              'sf'], //                              scroll text up (P)
  scroll_reverse = 'scroll_reverse', //                                   ['ri',                               'sr'], //                              scroll text down (P)
  select_char_set = 'select_char_set', //                                  ['scs',                              'Zj'], //                              Select character set, #1



  set_attributes = 'set_attributes', //                                   ['sgr',                              'sa'], //                              define video attributes #1-#9 (PG9)
  set_background = 'set_background', //                                   ['setb',                             'Sb'], //                              Set background color #1
  set_bottom_margin = 'set_bottom_margin', //                                ['smgb',                             'Zk'], //                              Set bottom margin at current line
  set_bottom_margin_parm = 'set_bottom_margin_parm', //                           ['smgbp',                            'Zl'], //                              Set bottom margin at line #1 or (if smgtp is not given) #2 lines from bottom
  set_clock = 'set_clock', //                                        ['sclk',                             'SC'], //                              set clock, #1 hrs #2 mins #3 secs
  set_color_pair = 'set_color_pair', //                                   ['scp',                              'sp'], //                              Set current color pair to #1
  set_foreground = 'set_foreground', //                                   ['setf',                             'Sf'], //                              Set foreground color #1
  set_left_margin = 'set_left_margin', //                                  ['smgl',                             'ML'], //                              set left soft margin at current col‐ umn.  See smgl. (ML is not in BSD termcap).
  set_left_margin_parm = 'set_left_margin_parm', //                             ['smglp',                            'Zm'], //                              Set left (right) margin at column #1
  set_right_margin = 'set_right_margin', //                                 ['smgr',                             'MR'], //                              set right soft margin at current column
  set_right_margin_parm = 'set_right_margin_parm', //                            ['smgrp',                            'Zn'], //                              Set right margin at column #1
  set_tab = 'set_tab', //                                          ['hts',                              'st'], //                              set a tab in every row, current columns
  set_top_margin = 'set_top_margin', //                                   ['smgt',                             'Zo'], //                              Set top margin at current line
  set_top_margin_parm = 'set_top_margin_parm', //                              ['smgtp',                            'Zp'], //                              Set top (bottom) margin at row #1
  set_window = 'set_window', //                                       ['wind',                             'wi'], //                              current window is lines #1-#2 cols #3-#4
  start_bit_image = 'start_bit_image', //                                  ['sbim',                             'Zq'], //                              Start printing bit image graphics
  start_char_set_def = 'start_char_set_def', //                               ['scsd',                             'Zr'], //                              Start character set defi‐ nition #1, with #2 charac‐ ters in the set
  stop_bit_image = 'stop_bit_image', //                                   ['rbim',                             'Zs'], //                              Stop printing bit image graphics
  stop_char_set_def = 'stop_char_set_def', //                                ['rcsd',                             'Zt'], //                              End definition of charac‐ ter set #1
  subscript_characters = 'subscript_characters', //                             ['subcs',                            'Zu'], //                              List of subscriptable characters
  superscript_characters = 'superscript_characters', //                           ['supcs',                            'Zv'], //                              List of superscriptable characters
  tab = 'tab', //                                              ['ht',                               'ta'], //                              tab to next 8-space hard‐ ware tab stop
  these_cause_cr = 'these_cause_cr', //                                   ['docr',                             'Zw'], //                              Printing any of these characters causes CR
  to_status_line = 'to_status_line', //                                   ['tsl',                              'ts'], //                              move to status line, col‐ umn #1
  tone = 'tone', //                                             ['tone',                             'TO'], //                              select touch tone dialing
  underline_char = 'underline_char', //                                   ['uc',                               'uc'], //                              underline char and move past it
  up_half_line = 'up_half_line', //                                     ['hu',                               'hu'], //                              half a line up
  user0 = 'user0', //                                            ['u0',                               'u0'], //                              User string #0
  user1 = 'user1', //                                            ['u1',                               'u1'], //                              User string #1
  user2 = 'user2', //                                            ['u2',                               'u2'], //                              User string #2
  user3 = 'user3', //                                            ['u3',                               'u3'], //                              User string #3
  user4 = 'user4', //                                            ['u4',                               'u4'], //                              User string #4
  user5 = 'user5', //                                            ['u5',                               'u5'], //                              User string #5

  user6 = 'user6', //                                            ['u6',                               'u6'], //                              User string #6
  user7 = 'user7', //                                            ['u7',                               'u7'], //                              User string #7
  user8 = 'user8', //                                            ['u8',                               'u8'], //                              User string #8
  user9 = 'user9', //                                            ['u9',                               'u9'], //                              User string #9
  wait_tone = 'wait_tone', //                                        ['wait',                             'WA'], //                              wait for dial-tone
  xoff_character = 'xoff_character', //                                   ['xoffc',                            'XF'], //                              XOFF character
  xon_character = 'xon_character', //                                    ['xonc',                             'XN'], //                              XON character
  zero_motion = 'zero_motion', //                                      ['zerom',                            'Zx'], //                              No motion for subsequent character

  // The following string capabilities are present in the SVr4.0 term structure, but were originally not documented in the man page.


  //         Variable                                      Cap-                                 TCap                                 Description
  //          String                                       name                                 Code
  alt_scancode_esc = 'alt_scancode_esc', //                                   ['scesa',                                'S8'], //                                Alternate escape for scancode emu‐ lation
  bit_image_carriage_return = 'bit_image_carriage_return', //                          ['bicr',                                 'Yv'], //                                Move to beginning of same row
  bit_image_newline = 'bit_image_newline', //                                  ['binel',                                'Zz'], //                                Move to next row of the bit image
  bit_image_repeat = 'bit_image_repeat', //                                   ['birep',                                'Xy'], //                                Repeat bit image cell #1 #2 times
  char_set_names = 'char_set_names', //                                     ['csnm',                                 'Zy'], //                                Produce #1'th item from list of char‐ acter set names
  code_set_init = 'code_set_init', //                                      ['csin',                                 'ci'], //                                Init sequence for multiple codesets
  color_names = 'color_names', //                                        ['colornm',                              'Yw'], //                                Give name for color #1
  define_bit_image_region = 'define_bit_image_region', //                            ['defbi',                                'Yx'], //                                Define rectan‐ gualar bit image region
  device_type = 'device_type', //                                        ['devt',                                 'dv'], //                                Indicate lan‐ guage/codeset sup‐ port
  display_pc_char = 'display_pc_char', //                                    ['dispc',                                'S1'], //                                Display PC charac‐ ter #1
  end_bit_image_region = 'end_bit_image_region', //                               ['endbi',                                'Yy'], //                                End a bit-image region
  enter_pc_charset_mode = 'enter_pc_charset_mode', //                              ['smpch',                                'S2'], //                                Enter PC character display mode
  enter_scancode_mode = 'enter_scancode_mode', //                                ['smsc',                                 'S4'], //                                Enter PC scancode mode
  exit_pc_charset_mode = 'exit_pc_charset_mode', //                               ['rmpch',                                'S3'], //                                Exit PC character display mode
  exit_scancode_mode = 'exit_scancode_mode', //                                 ['rmsc',                                 'S5'], //                                Exit PC scancode mode
  get_mouse = 'get_mouse', //                                          ['getm',                                 'Gm'], //                                Curses should get button events, parameter #1 not documented.
  key_mouse = 'key_mouse', //                                          ['kmous',                                'Km'], //                                Mouse event has occurred
  mouse_info = 'mouse_info', //                                         ['minfo',                                'Mi'], //                                Mouse status information
  pc_term_options = 'pc_term_options', //                                    ['pctrm',                                'S6'], //                                PC terminal options
  pkey_plab = 'pkey_plab', //                                          ['pfxl',                                 'xl'], //                                Program function key #1 to type string #2 and show string #3
  req_mouse_pos = 'req_mouse_pos', //                                      ['reqmp',                                'RQ'], //                                Request mouse position

  scancode_escape = 'scancode_escape', //                                    ['scesc',                                'S7'], //                                Escape for scan‐ code emulation
  set0_des_seq = 'set0_des_seq', //                                       ['s0ds',                                 's0'], //                                Shift to codeset 0 (EUC set 0, ASCII)
  set1_des_seq = 'set1_des_seq', //                                       ['s1ds',                                 's1'], //                                Shift to codeset 1
  set2_des_seq = 'set2_des_seq', //                                       ['s2ds',                                 's2'], //                                Shift to codeset 2
  set3_des_seq = 'set3_des_seq', //                                       ['s3ds',                                 's3'], //                                Shift to codeset 3
  set_a_background = 'set_a_background', //                                   ['setab',                                'AB'], //                                Set background color to #1, using ANSI escape
  set_a_foreground = 'set_a_foreground', //                                   ['setaf',                                'AF'], //                                Set foreground color to #1, using ANSI escape
  set_color_band = 'set_color_band', //                                     ['setcolor',                             'Yz'], //                                Change to ribbon color #1
  set_lr_margin = 'set_lr_margin', //                                      ['smglr',                                'ML'], //                                Set both left and right margins to #1, #2.  (ML is not in BSD term‐ cap).
  set_page_length = 'set_page_length', //                                    ['slines',                               'YZ'], //                                Set page length to #1 lines
  set_tb_margin = 'set_tb_margin', //                                      ['smgtb',                                'MT'], //                                Sets both top and bottom margins to #1, #2

  // The XSI Curses standard added these.  They are some post-4.1 versions of System V curses, e.g., Solaris 2.5 and IRIX 6.x.  The ncurses termcap
  // names for them are invented; according to the XSI Curses standard, they have no termcap names.  If your compiled terminfo entries  use  these,
  // they may not be binary-compatible with System V terminfo entries after SVr4.1; beware!


  //         Variable                                      Cap-                               TCap                                 Description
  //          String                                       name                               Code
  enter_horizontal_hl_mode = 'enter_horizontal_hl_mode', //                           ['ehhlm',                              'Xh'], //                               Enter horizontal highlight mode
  enter_left_hl_mode = 'enter_left_hl_mode', //                                 ['elhlm',                              'Xl'], //                               Enter left highlight mode
  enter_low_hl_mode = 'enter_low_hl_mode', //                                  ['elohlm',                             'Xo'], //                               Enter low highlight mode
  enter_right_hl_mode = 'enter_right_hl_mode', //                                ['erhlm',                              'Xr'], //                               Enter right high‐ light mode
  enter_top_hl_mode = 'enter_top_hl_mode', //                                  ['ethlm',                              'Xt'], //                               Enter top highlight mode
  enter_vertical_hl_mode = 'enter_vertical_hl_mode', //                             ['evhlm',                              'Xv'], //                               Enter vertical high‐ light mode
  set_a_attributes = 'set_a_attributes', //                                   ['sgr1',                               'sA'], //                               Define second set of video attributes #1-#6
  set_pglen_inch = 'set_pglen_inch', //                                     ['slength',                            'sL']  //                               YI Set page length to #1 hundredth of an inch
}

}