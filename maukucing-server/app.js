const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const indexRoutes = require('./routes/indexRoutes')
const errorMiddleware = require('./middleware/errorHandler')
const authentication = require('./middleware/authentication')
// const authenticationMiddleware = require('./middleware/authentication')

const app = express()


app.use(express.json())
app.use(cors())

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }


app.use(authRoutes)
app.use(authentication)
app.use(indexRoutes)
app.use(errorMiddleware)


module.exports = app


