const Modal = (() => {
  'use strict'
  class Modal {
    constructor ({
      targetModal,
      onShow = () => {},
      onClose = () => {},
      disableScroll = false,
      disableFocus = false,
    }) {
      this.modal = document.getElementById(targetModal)
      this.config = {disableScroll,onShow, onClose, disableFocus }
      this.onClick = this.onClick.bind(this)
      this.onKeydown = this.onKeydown.bind(this)
      this.makecss()
    }
    makecss(){
      // container
      var mcontainer = this.modal.querySelector('.modal-container')
      Object.assign(mcontainer.style, {
           'background-color': '#fff',
            padding: '30px',
            'max-width': '500px',
            'max-height': '100vh',
            'border-radius': '4px',
            'overflow-y': 'auto',
            'box-sizing': 'border-box'})
      Object.assign(this.modal.style, {display: 'block'})
      //overlay
      var overlay = this.modal.querySelector('.modal-overlay')
      Object.assign(overlay.style, {position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            'justify-content': 'center',
            'align-items': 'center'})
      // cross
      var cross = this.modal.querySelector('.cross')
      cross.innerText = "\u2715"
      Object.assign(cross.style, { border: 0,background:'transparent'})
      // title
      var mtitle = this.modal.querySelector('.modal-title')
      Object.assign(mtitle.style, {'margin-top': 0,'margin-bottom': 0})
      // header
      var mheader = this.modal.querySelector('.modal-header')
      Object.assign(mheader.style, {
            display: 'flex',
            'justify-content': 'space-between',
            'align-items': 'center'})
    }
    showModal () {
      // this.makecss()
      this.activeElement = document.activeElement
      this.modal.classList.add('is-open')
      this.setFocusToFirstNode()
      this.scrollBehaviour('disable')
      this.addEventListeners()
      this.config.onShow(this.modal)
    }
    closeModal () {
      Object.assign(this.modal.style, {display: 'none'})
      const modal = this.modal
      this.removeEventListeners()
      this.scrollBehaviour('enable')
      this.activeElement.focus()
      // console.trace()
      this.config.onClose(this.modal,this.modalResult)
      modal.classList.remove('is-open')
    }
    okModal(){
      this.modalResult = 'ok'
      this.closeModal()
    }
    cancelModal(e){
      if (!e || this.isOverlay(e)){
        this.modalResult = 'cancel'
        this.closeModal()
      }
    }
    isOverlay(e){
      return e && e.target && (e.target.getAttribute("class") == "modal-overlay")
    }
    scrollBehaviour (toggle) {
      if (!this.config.disableScroll) return
      const body = document.querySelector('body')
      switch (toggle) {
        case 'enable':
          Object.assign(body.style, {overflow: 'initial', height: 'initial'})
          break
        case 'disable':
          Object.assign(body.style, {overflow: 'hidden', height: '100vh'})
          break
        default:
      }
    }
    addEventListeners () {
      this.modal.addEventListener('touchstart', this.onClick)
      this.modal.addEventListener('click', this.onClick)
      document.addEventListener('keydown', this.onKeydown)
    }
    removeEventListeners () {
      this.modal.removeEventListener('touchstart', this.onClick)
      this.modal.removeEventListener('click', this.onClick)
      document.removeEventListener('keydown', this.onKeydown)
    }
    onClick (event) {
      if (event.target.hasAttribute(this.config.closeTrigger)) {
        this.closeModal()
        event.preventDefault()
      }
    }
    onKeydown (event) {
      if (event.keyCode === 27) this.closeModal(event)
      if (event.keyCode === 9) this.doTab(event)
    }
    getFocusableNodes () {
      const FOCUSABLE_ELEMENTS = [
        'a[href]',
        'area[href]',
        'input:not([disabled]):not([type="hidden"])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'button:not([disabled])',
        'iframe',
        'object',
        'embed',
        '[contenteditable]',
        '[tabindex]:not([tabindex^="-"])'
      ]
      const nodes = this.modal.querySelectorAll(FOCUSABLE_ELEMENTS)
      return Object.keys(nodes).map((key) => nodes[key])
    }
    setFocusToFirstNode () {
      if (this.config.disableFocus) return
      const focusableNodes = this.getFocusableNodes()
      if (focusableNodes.length) focusableNodes[0].focus()
    }
    doTab (event) {
      const focusableNodes = this.getFocusableNodes()
      if (!this.modal.contains(document.activeElement)) {
        focusableNodes[0].focus()
      } else {
        const focusedItemIndex = focusableNodes.indexOf(document.activeElement)
        if (event.shiftKey && focusedItemIndex === 0) {
          focusableNodes[focusableNodes.length - 1].focus()
          event.preventDefault()
        }
        if (!event.shiftKey && focusedItemIndex === focusableNodes.length - 1) {
          focusableNodes[0].focus()
          event.preventDefault()
        }
      }
    }
  }
  // class end 
  let activeModal = null
  const show = (targetModal, config) => {
    const options = config || {}
    options.targetModal = targetModal
    activeModal = new Modal(options)
    activeModal.showModal()
  }
  const close = () => {
    activeModal.closeModal()
    return activeModal.modalResult
  }
  const okModal = () => {
    activeModal.okModal()
    return activeModal.modalResult
  }
  const cancelModal = (e) => {
    activeModal.cancelModal(e)
    return activeModal.modalResult
  }
  return { show, close,ok:okModal,cancel:cancelModal }
})()
