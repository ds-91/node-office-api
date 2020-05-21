const env = require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const routes = require('./routes/quotes_routes')
const path = require('path')

app.use(morgan('short'))
app.use('/', routes)
app.use(express.static(path.join(__dirname, '/static')));

var port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Server listening on port " + port)
})

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname + '/static/home.html'))
})