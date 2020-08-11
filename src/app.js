'use strict'
import { isValid, openAuthModal } from './utils'
import { Questions } from './Questions'
import './styles.scss';

console.log('%c App is working', 'color:green')

window.addEventListener('load', Questions.renderQuestions);

const form = document.querySelector('#submit-form');
const input = document.querySelector('#question-input');
const modalBtn = document.querySelector('#modal-btn');
const submitBtn = document.querySelector('#submit-button');

form.addEventListener('submit', submitHandler);
modalBtn.addEventListener('click', openAuthModal);
input.addEventListener('input', () => submitBtn.disabled = !isValid(input.value));

function submitHandler (event) {
	event.preventDefault();
	if (isValid(input.value)) {
		const question = {
			text: input.value.trim(),
			date: new Date().toJSON()
		}
		submitBtn.disabled = true;
		Questions.create(question).then( ()=> {
			input.value = '';
			input.className = '';
			submitBtn.disabled = false
		})
			.then(Questions.renderQuestions);
	}
}


