export class Form {
  constructor({ wrapper }) {
    this.wrapper = wrapper
    this.offsetX
    this.offsetY
    this.btnOpen
    this.form

    this.renderBtnOpen()
  }

  #checkTarget(event) {
    event.preventDefault()

    if (event.target.dataset.type === 'close') {
      this.removeForm()
      this.form.removeEventListener('click', this.#checkTarget)
    }
    if (event.target.closest('.item-checkbox')) {
      this.checked()
    }
  }

  #addFormHandler() { 
    this.form.addEventListener('click', this.#checkTarget.bind(this))
    this.form.addEventListener('dragstart', this.#dragStart)
    this.form.addEventListener('dragend', this.#dragEnd)
  }
  
  #removeFormHandler() {
    this.form.removeEventListener('click', this.#checkTarget.bind(this))
    this.form.removeEventListener('dragstart', this.#dragStart)
    this.form.removeEventListener('dragend', this.#dragEnd)
  }

  #dragStart(event) {
    this.offsetX = event.offsetX
    this.offsetY = event.offsetY
  }

  #dragEnd(event) {
    const { clientX, clientY } = event

    event.target.style.left = clientX - (this.offsetX || 0) + 'px'
    event.target.style.top = clientY - (this.offsetY || 0) + 'px'
  }

  #setPosition(el) {
    el.style.left = (this.btnOpen?.offsetLeft || 0) + 'px'
    el.style.top = (this.btnOpen?.offsetTop || 0) + 'px'
  }

  #showForm(el) {
    this.#setPosition(el)
    setTimeout(() => el.classList.remove('hide'), 0)
    this.#addFormHandler()
  }

  renderBtnOpen() {
    if (this.btnOpen) return

    const btnOpen = document.createElement('button')

    btnOpen.classList.add('btn', 'btn_open', 'hide')
    btnOpen.setAttribute('data-type', 'open')
    btnOpen.insertAdjacentHTML('beforeend', `<i class="fas fa-user"></i>`)

    this.wrapper.insertAdjacentElement('beforeend', btnOpen)
    setTimeout(() => btnOpen.classList.remove('hide'), 100)

    this.btnOpen = btnOpen
    this.btnOpen.addEventListener('click', this.createForm.bind(this))
  }

  createForm() {
    const form = `
      <form class="form hide" action="#" draggable="true">
        <button class="btn btn_close" data-type="close">
          <i class="fas fa-times"></i>
        </button>
        <h2 class="form-title">
          enter your details
        </h2>
        <div class="form-item item-email">
          <input class="input" id="inputEmail" type="email" placeholder=" ">
          <label class="label" id="labelEmail" for="inputEmail">
            E-mail
          </label>
        </div>
        <div class="form-item item-password">
          <input class="input" id="inputPassword" type="password" placeholder=" ">
          <label class="label" id="labelPassword" for="inputPassword">
            Password
          </label>
        </div>
        <div class="form-item item-checkbox">
          <input class="input-checkbox" id="inputCheckbox" type="checkbox" hidden>
          <span class="castom-checkbox"></span>
          <label class="label-checkbox" id="labelCheckbox">
            Keep me Signer in
          </label>
        </div>
        <button class="btn btn_submit" type="submit" data-type="submit">
          Sign-in
        </button>
      </form>
    `

    if (!this.form) {
      this.wrapper.insertAdjacentHTML('beforeend', form)
      this.form = this.wrapper.querySelector('.form')
      this.#showForm(this.form)
    }
  }

  checked() {
    const castomCheckbox = this.wrapper.querySelector('.item-checkbox')

    if (!castomCheckbox) return

    if (castomCheckbox.classList.contains('checked')) {
      castomCheckbox.classList.remove('checked')
      inputCheckbox.checked = false
    } else {
      castomCheckbox.classList.add('checked')
      inputCheckbox.checked = true
    }
  }

  removeForm() {
    if (this.form) {
      this.form.classList.add('hide')
      this.#removeFormHandler()
      setTimeout(() => {
        this.form.remove()
        this.form = null
      }, 300)
    }
  }

  destroy() {
    this.removeForm()

    if (this.btnOpen) {
      this.btnOpen.classList.add('hide')
      this.btnOpen.removeEventListener('click', this.createForm.bind(this))

      setTimeout(() => {
        this.btnOpen.remove()
        this.btnOpen = null
      }, 300)
    }
  }
}
