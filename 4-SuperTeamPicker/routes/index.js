const Express = require('express')
const bodyParser = require('body-parser')

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
})

router.get('/:id', (request, response) => {

  const {id} = request.params
  const {body} = request;

  console.log(request.query.count)

  kx
    .first()
    .from('cohorts')
    .where({id}) // <-- syntax sugar for {id: id}
    .then(cohort => {
      if(request.query.count && request.query['randomizer'] == 'perteam'){
        let counting = request.query.count
        let result = shuffle(cohort.members, counting)
        response.render('cohorts/show', {cohort, result})

      } else if (request.query.count && request.query['randomizer'] == 'teamcount') {
        let counting = request.query.count
        let result = shuffle2(cohort.members, counting)
        response.render('cohorts/show', {cohort, result})

      } else{
        response.render('cohorts/show', {cohort, result: null})
      }

    })

})


router.post('/cohorts', upload.single('photo'), (request, response) => {
  const {body} = request;

  const {name, members} = request.body;
  const {filename} = request.file;

    console.log(body)



  kx
    .insert({name: name, members: members, logo_url: `/uploads/${filename}` })
    .into('cohorts')
    .then(() => response.redirect('/cohorts'))

  // response.render('cohort')
})

function shuffle(content, count) {
    array = content.split(',').sort(() => Math.random() - .5);
    let array2 = [];
    while (array.length > 0) {
        array2.push(array.splice(0, count));
    }
    return array2
}

function shuffle2(content, count) {
   let array = content.split(',').sort(() => Math.random() - .5);
   let rest = array.length % count
   let restUsed = rest
   let partLength = Math.floor(array.length / count)
   let array2 = [];
   for (let i = 0; i < array.length; i += partLength) {
       let end = partLength + i
       let add = false;
       if (rest !== 0 && restUsed) {
           end++
           restUsed--
           add = true;
       }
       array2.push(array.slice(i, end))
       if (add) {
           i++;
       }
   }
   return array2
}

module.exports = router
