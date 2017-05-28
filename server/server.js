const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const logger = require('morgan')
let index = require('./routes/index')
const cors = require('cors')
require('dotenv').config()

app.use(cors())
mongoose.connect('mongodb://localhost/simple-memo')
app.set('port', process.env.PORT || 3000)

app.use(logger('dev'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/', index)

app.listen(app.get('port'), () => {
  console.log('Listening on port: '+app.get('port'));
})