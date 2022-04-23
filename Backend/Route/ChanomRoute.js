const chanomRoute = require('express').Router()
const chanomsController = require('../Controller/ChanomsController')

chanomRoute.get('/show',chanomsController.get)
chanomRoute.post('/add',chanomsController.post)

chanomRoute.put('/update/:catID',chanomsController.update)
chanomRoute.delete('/delete/:catID',chanomsController.delete)

module.exports = chanomRoute ;