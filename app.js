const env = require('dotenv').config()
const app = require('express')()
const morgan = require('morgan')

const routes = require('./routes/quotes_routes')

app.use(morgan('short'))
app.use('/', routes)

var port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Server listening on port " + port)
})