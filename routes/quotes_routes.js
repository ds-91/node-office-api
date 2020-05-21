const env = require('dotenv').config()
const routes = require('express').Router({caseSensitive: true})
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
    const query = {
        name: 'fetch-by-person',
        text: 'SELECT * FROM quote WHERE person = $1',
        values: [request.params.person]
    }

    client.query(query, (err, res) => {
        if (err) throw err
        result.status(200).json(res.rows)
    })
})

module.exports = routes
