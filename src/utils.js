import { authWithEmailAndPassword, getAuthForm } from './auth'
import { Questions } from './Questions'

export function isValid (value) {
	return value.length >= 10;
}


export function setToStorageQuestion (question) {
	const allQuestions = getFromStorageQuestions();
	console.log(allQuestions)
	localStorage.setItem('questions',JSON.stringify([question, ...allQuestions]))
}

export function getFromStorageQuestions () {
	return JSON.parse(localStorage.getItem('questions') || '[]');
}

export function toCard (question) {
	if (question) {
		const { date, text } = question;
		return `<div class="mui--text-black-54"> 
			${new Date(date).toLocaleDateString()} -
			${new Date(date).toLocaleTimeString()} <br/>
            ${text}</div>
            </div><br/>`;
	}
	return null;
}

function createModal (title, content) {
	const modal = document.createElement('div');
	modal.classList.add('modal');
	modal.innerHTML = `
	<h1>${title}</h1>
	<div class="modal-content">${content}</div>
	`;
	mui.overlay('on', modal);
}

export function openAuthModal () {
	createModal('Authorization', getAuthForm());
	document
		.getElementById('auth-form')
		.addEventListener('submit', authFormHandler, { once:true })
}

function authFormHandler (event) {
	event.preventDefault();

	const btn = event.target.querySelector('button');
	const email = event.target.querySelector('#email').value;
	const password = event.target.querySelector('#password').value;
	authWithEmailAndPassword(email, password)
		.then(Questions.fetch)
		.then(renderModalAfterAuth)
		.then(() => btn.disabled = true)
}

function renderModalAfterAuth (content) {
	if (typeof content === 'string'){
		createModal('Error', content);
	}
	else {
		createModal('Список вопросов', Questions.listToHTML(content));
	}
}
