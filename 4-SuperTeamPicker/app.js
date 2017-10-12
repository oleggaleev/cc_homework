const Express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')


// 🛣 ROUTES
const newPage = require('./routes/new')
const index = require('./routes/index')


const app = Express()

app.set('view engine', 'ejs')

app.use(Express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('dev'))




app.use('/cohorts/new', newPage)
app.use('/', index)
app.use('/cohorts', index)

const PORT = 4321;
app.listen(
  PORT,
  () => console.log(`💁 Server listening on http://localhost:${PORT}`)
)
