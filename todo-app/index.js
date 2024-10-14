const port = process.env.PORT
const fs = require('fs')
const express = require('express')
const app = express()
const axios = require('axios')

const imageUrl = 'https://picsum.photos/1200'
const imagePath = 'image.png'

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

app.get('/', (request, response) => {
	download_image(imageUrl, imagePath)
	response.send(`
		<h1>Todo-app</h1> 
		<img src="${imagePath}" width="600" height="300" alt="random image"/>
		<br/>
		<br/>
		<form>
			<input type="text" maxlength="140">
			<input type="submit" value="create TODO">
		<form/>

		<ul>
			<li>TODO 1</li>
			<li>TODO 2</li>
		<ul/>
	`)

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
