import { Form } from './src/Form.js'

const form = new Form({
	wrapper: document.querySelector('main') || document.querySelector('.wrapper') || document.body,
})

window.f = form
