const routes = require('express').Router()

routes.get('/', (req, res) => {
    res.status(200).json({message: "Connected!"})
})

routes.get('/test', (req, res) => {
    res.status(200).json({message: "Hello from routes! (bitch)"})
})

module.exports = routes
