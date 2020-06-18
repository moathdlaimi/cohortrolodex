const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 3000

app.use(express.static('public'))

app.get('/', (req,res) => {
    res.render('index.html')
})

app.listen(PORT, () => {
  console.log('Listening to port', PORT);
})
