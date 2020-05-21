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
    const query = {
        name: 'fetch-all-quotes',
        text: 'SELECT * FROM quote ORDER BY id ASC',
        values: []
    }

    client.query(query, (err, res) => {
        if (err) throw err
        for (let row of res.rows) {
            // if need to do something with each row
        }
        result.status(200).json(res.rows)
        client.end()
      })
})

routes.get('/quotes/id/:id', (request, result) => {
    const query = {
        name: 'fetch-by-id',
        text: 'SELECT * FROM quote WHERE id = $1',
        values: [request.params.id]
    }

    client.query(query, (err, res) => {
        if (err) throw err
        result.status(200).json(res.rows)
    })
})

routes.get('/quotes/person/:person', (request, result) => {
    const formatted_name = request.params.person[0].toUpperCase() + request.params.person.substring(1).toLowerCase()
    const query = {
        name: 'fetch-by-person',
        text: 'SELECT * FROM quote WHERE person = $1 ORDER BY id ASC',
        values: [formatted_name]
    }

    client.query(query, (err, res) => {
        if (err) throw err
        result.status(200).json(res.rows)
    })
})

routes.get('/quotes/random', (request, result) => {
    const query = {
        name: 'fetch-random',
        text: 'SELECT * FROM quote ORDER BY RANDOM() LIMIT 1',
        values: []
    }

    client.query(query, (err, res) => {
        if (err) throw err
        result.status(200).json(res.rows)
    })
})

routes.get('/quotes/random/:n', (request, result) => {
    const query = {
        name: 'fetch-random',
        text: 'SELECT * FROM quote ORDER BY RANDOM() LIMIT $1',
        values: [request.params.n]
    }

    client.query(query, (err, res) => {
        if (err) throw err
        result.status(200).json(res.rows)
    })
})

module.exports = routes
