const chanomRouter = require('express').Router()
const chanomController = require('../controller/chanomController')

chanomRouter.get('/show',chanomController.get)
chanomRouter.post('/add',chanomController.post)

chanomRouter.put('/update/:chanomID',chanomController.update)
chanomRouter.delete('/delete/:chanomID',chanomController.delete)

module.exports = chanomRouter ;