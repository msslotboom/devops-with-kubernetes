const port = process.env.PORT
const express = require('express')
const app = express()

const printPort = () => {
	console.log(`Server started on port ${port}`)
	setTimeout(printPort, 5000)
}

app.listen(port, () => {
	console.log(`Server started on port ${port}`)
  })

printPort()