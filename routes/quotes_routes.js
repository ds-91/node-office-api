const env = require('dotenv').config()
const routes = require('express').Router()
const { Pool, Client } = require('pg')
const pool = new Pool()

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect()

routes.get('/', (req, res) => {
    res.status(200).json({message: "Connected!"})
})

routes.get('/all', (request, result) => {
    client.query('SELECT * FROM quote', (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
            // if need to do something with each row
        }
        result.status(200).json(res.rows)
        client.end();
      });
})

module.exports = routes
