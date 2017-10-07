const Express = require('express')
const multer = require('multer')
const path = require('path')
const router = Express.Router()
const kx = require('../db/connection')

const upload = multer({dest: path.join(__dirname, '..', 'public', 'uploads')})

router.get('/', (request, response) => {
  response.render('index')
})

router.get('/cohorts', (request, response) => {
  kx
    .select()
    .from('cohorts')
    .then(cohorts => {
      response.render('cohort', {cohorts})
    })

  // response.render('cohort')
})

router.post('/cohorts', (request, response) => {
  const {body} = request;

  const {name, members} = request.body;
  const {filename} = request.file;



  kx
    .insert({name: name, members: members, logo_url: `/uploads/${filename}` })
    .into('cohorts')
    .then(() => response.redirect('/new'))

  // response.render('cohort')
})

module.exports = router
