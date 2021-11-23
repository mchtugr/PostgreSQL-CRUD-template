require('dotenv').config()
const express = require('express')
const db = require('./db/index')
const app = express()

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.status(200).json({ message: 'success' })
})

// retrieve all books
app.get('/', db.books.find)
//retrieve filtered books
app.get('/books', db.books.findOne)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server started on port: ${port}`)
})
