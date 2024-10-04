const port = process.env.PORT
const express = require('express')
const app = express()

var pong = 0


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
})

printPort()
