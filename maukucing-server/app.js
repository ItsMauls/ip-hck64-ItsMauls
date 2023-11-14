const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const indexRoutes = require('./routes/indexRoutes')
const errorMiddleware = require('./middleware/errorHandler')
const authentication = require('./middleware/authentication')
// const authenticationMiddleware = require('./middleware/authentication')

const app = express()


app.use(cors())
app.use(express.json())

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }


app.use(authRoutes)
app.use(authentication)
app.use(indexRoutes)
app.use(errorMiddleware)

app.listen(3000)
// module.exports = app


