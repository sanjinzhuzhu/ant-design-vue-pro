const express = require('express')
const app = express()

app.get('/api/dashboard/chart', function (req, res) {
  res.send([20, 40, 78, 10, 30, 47])
})

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)