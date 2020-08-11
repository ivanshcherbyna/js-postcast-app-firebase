import { setToStorageQuestion, getFromStorageQuestions, toCard } from './utils';

export class Questions{
	static create(question){
		return fetch('https://js-podcast-app-1944b.firebaseio.com/questions.json',{
		method: 'POST',
		body: JSON.stringify(question),
		headers:{
			'Content-Type': 'application/json'
		}
		})
			.then( response => response.json())
			.then( responce => {
				question.id = responce.name
			return question;
		})
			.then(setToStorageQuestion)
	}

	static fetch(token){
		if (!token){
			return Promise.resolve(`<p class="error">You are haven't token</p>`)
		}
		return fetch(`https://js-podcast-app-1944b.firebaseio.com/questions.json?auth=${token}`)
			.then(responce => responce.json())
			.then(response => {
				if (response && response.error){
					return `<p class="error">${response.error}</p>`
				}

				return response ? Object.keys(response).map( key =>({
					...response[key],
					id: key
				})) : []
			})
	}

	static renderQuestions(){
		const questions = getFromStorageQuestions();
		const list = document.querySelector('#list');
		const html = questions.length ?
			questions.map(toCard).join('') :
			` <div class="mui--text-headline">Questions are not exist...</div>`;

		list.innerHTML = html;
	}
	static listToHTML(questions){
		return questions.length
		? `<ol>${questions.map( q => `<li>${q.text}</li>`).join('')}</ol>`
		: `<p class="info">Вопросов пока нет</p>`
	}
}

