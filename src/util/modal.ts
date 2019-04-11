import * as blessed from 'blessed'

export function showInModal(screen: blessed.Widgets.Screen, s: string | blessed.Widgets.BlessedElement) {
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
  } else {
    if (lastModalContent) {
      modalInstance.remove(lastModalContent)
    }
    lastModalContent = s
    modalInstance.append(s)
  }
  modalInstance.show()
  screen.render()
}
let modalInstance: blessed.Widgets.BoxElement | undefined
let lastModalContent: blessed.Widgets.BlessedElement | undefined

export function closeModal(screen: blessed.Widgets.Screen) {
  if (modalInstance) {
    modalInstance.hide()
  }
  screen.render()
}

export function isModalVisible() {
  return modalInstance && modalInstance.visible
}
