import * as blessed from 'blessed'
import { tryTo } from 'misc-utils-of-mine-generic'

/**
 * Easy to use modal: ``` showInModal(screen, anElement)``` or simply:  ``` showInModal(screen, 'some text')```
 */
export function showInModal(
  screen: blessed.Widgets.Screen,
  s: string | blessed.Widgets.BlessedElement,
  title = 'Modal'
) {
  if (!modalInstance) {
    modalInstance = blessed.box({
      parent: screen,
      left: 'center',
      top: 'center',
      width: '50%',
      height: '50%',
      draggable: true,
      border: {
        type: 'line',
        left: true,
        top: true,
        right: true,
        bottom: true
      },
      content: 'Drag Me'
    })
    ;[modalInstance, ...modalInstance.children].forEach(c => c.on('click', data => modalInstance!.hide()))
  }
  if (typeof s === 'string') {
    modalInstance.setContent(s)
    modalInstance.setLabel(title)
  } else {
    tryTo(() => {
      modalInstance && lastModalContent && modalInstance.remove(lastModalContent)
      lastModalContent && lastModalContent.destroy()
    })
    lastModalContent = s
    modalInstance.append(s)
  }
  modalInstance.show()
  screen.render()
}
let modalInstance: blessed.Widgets.BoxElement | undefined
let lastModalContent: blessed.Widgets.BlessedElement | undefined

/**
 * Close current opened modal
 */
export function closeModal(screen: blessed.Widgets.Screen) {
  tryTo(() => {
    if (modalInstance) {
      modalInstance.hide()
    }
    resetModals() // safer not reuse
    screen.render()
  })
}

/**
 * Resets this manager. Useful when you are destroying / recreating screen to make sure there are no missing references to forgotten nodes.
 */
export function resetModals() {
  tryTo(() => {
    modalInstance && lastModalContent && modalInstance.remove(lastModalContent)
    lastModalContent && lastModalContent.destroy()
    modalInstance && modalInstance.destroy()
  })
  modalInstance = undefined
  lastModalContent = undefined
}

export function isModalVisible() {
  return modalInstance && modalInstance.visible
}
