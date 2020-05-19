const app = require('express')()
const morgan = require('morgan')
const mysql = require('mysql')

const routes = require('./routes/quotes_routes')

app.use(morgan('short'))
app.use('/', routes)

app.listen(3000, () => {
    console.log("Server listening on port 3000...")
})