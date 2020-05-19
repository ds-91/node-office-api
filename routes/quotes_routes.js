const env = require('dotenv').config()
const routes = require('express').Router()
const { Pool, Client } = require('pg')
const pool = new Pool()

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

client.connect()

routes.get('/', (req, res) => {
    res.status(200).json({message: "Connected!"})
})

routes.get('/quotes', (request, result) => {
    client.query('SELECT * FROM quote', (err, res) => {
        if (err) throw err
        for (let row of res.rows) {
            // if need to do something with each row
        }
        result.status(200).json(res.rows)
        client.end()
      })
})

routes.get('/quotes/id/:id', (request, result) => {
    client.query('SELECT * FROM quote WHERE id=' + request.params.id, (err, res) => {
        if (err) throw err
        result.status(200).json(res.rows)
    })
})

routes.get('/quotes/person/:person', (request, result) => {
    var name = request.params.person[0].toUpperCase() + request.params.person.substring(1)
    console.log(name)
    client.query('SELECT * FROM quote WHERE person=' + name, (err, res) => {
        if (err) throw err
        result.status(200).json(res.rows)
    })
})

module.exports = routes
