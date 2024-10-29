const port = process.env.PORT
const fs = require('fs')
const express = require('express')
const app = express()
const axios = require('axios')
const bodyParser = require('body-parser')
const imageUrl = 'https://picsum.photos/1200'
const imagePath = 'image.png'

app.use(bodyParser.urlencoded({ extended: true }));

let lastImagePullTime = null
fs.readFile('/usr/src/app/files/lastpull.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err);
		writeFile('0', "lastpull.txt");
		return;
	}
	pong = parseInt(data);
});

app.use(express.static(__dirname));
app.listen(port, () => {
	console.log(`Server started on port ${port}`)
})

app.get('/', async (request, response) => {
	const todos = await getTodos();
	console.log(todos)
	download_image(imageUrl, imagePath)

	response.send(`
		<h1>Todo-app</h1> 
		<img src="${imagePath}" width="600" height="300" alt="random image"/>
		<br/>
		<br/>
		<form method="POST" action="/todos">
			<input type="text" id="todoText" name="todoText" maxlength="140">
			<input type="submit" value="create TODO">
		<form/>

		<ul>
			${todos.todos.map(todo => `<li>${todo}</li>`).join('')}
		<ul/>
	`)

})

const getTodos = async () => {
	const response = await axios.get('http://todo-backend-svc:1236/todos')
	return response.data
}

app.post('/todos', async (request, response) => {
	const todo = request.body.todoText
	const res = await axios.post('http://todo-backend-svc:1236/todos', { todo })
	console.log(res)
	response.redirect('/')
})


const download_image = (url, image_path) => {
	const currentTime = new Date()

	if (!lastImagePullTime || (currentTime - lastImagePullTime) >= 60 * 60 * 1000) {
		lastImagePullTime = currentTime;
		return axios({
			url,
			responseType: 'stream',
		}).then(
			response => new Promise((resolve, reject) => {
				response.data
					.pipe(fs.createWriteStream(image_path))
					.on('finish', () => {
						writeFile(currentTime.toString(), "lastpull.txt");
						return resolve()
					})
					.on('error', e => reject(e));
			}))
	}
}
const writeFile = (text, dest) => {
	fs.writeFile(`/usr/src/app/files/${dest}`, text, err => {
		if (err) {
			console.log(err)
		}
	})
}
