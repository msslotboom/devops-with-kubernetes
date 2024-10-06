const port = process.env.PORT
const fs = require('node:fs')
const express = require('express')
const app = express()

var pong = 0
fs.readFile('/usr/src/app/files/pongs.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err);
		writeFile('0');
		return;
	}
	pong = parseInt(data);
});

const printPort = () => {
	console.log(`Server started on port ${port}`)
	setTimeout(printPort, 5000)
}

app.listen(port, () => {
	console.log(`Server started on port ${port}`)
})

app.get('/pingpong', (request, response) => {
	console.log('request: ' + request)
	response.send('pong ' + pong)
	pong = pong + 1;
	writeFile(pong.toString());
})

const writeFile = (text) => {
	fs.writeFile('/usr/src/app/files/pongs.txt', text, err => {
		if (err) {
			console.log(err);
		}
	})
}

printPort()
