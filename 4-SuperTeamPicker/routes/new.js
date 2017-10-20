const Express = require('express')
const multer = require('multer')
const path = require('path')
const router = Express.Router()
const kx = require('../db/connection')

const upload = multer({dest: path.join(__dirname, '..', 'public', 'uploads')})


router.get('/', (request, response) => {

  kx
    .select()
    .from('cohorts')
    .then(cohorts => {
      response.render('cohorts/new/new', {cohorts})
    })
})






module.exports = router
