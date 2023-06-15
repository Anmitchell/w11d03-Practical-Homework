const express = require('express') // express library
const morgan = require('morgan') // library for server logger
const todoRoutes = require('./routes/todoRoutes') // link to route file
const app = express() // express application

app.use(express.json()) // built in method for parsing json data
app.use(morgan('combined')) // use server logger
app.use('/todos', todoRoutes) // home path for making URI requests

module.exports = app