const chanomRoute = require('express').Router()
const chanomsController = require('../Controller/ChanomsController')

chanomRoute.get('/show',chanomsController.get)
chanomRoute.post('/add',chanomsController.post)

chanomRoute.put('/update/:chanomID',chanomsController.update)
chanomRoute.delete('/delete/:chanomID',chanomsController.delete)

module.exports = chanomRoute ;