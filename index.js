require('dotenv').config()
const express = require('express')
const db = require('./db/index')
const app = express()

app.use(express.urlencoded({ extended: true }))

// retrieve all books
app.get('/', db.books.find)
//retrieve filtered books
app.get('/books', db.books.findOne)
// retrieve single book
app.get('/books/:id', db.books.findById)

// create new book
app.post('/books', db.books.create)

// update a book
app.patch('/books', db.books.updateOne)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server started on port: ${port}`)
})
