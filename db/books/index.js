const { response } = require('express')
const client = require('../db')

// retrieve all books
const find = (req, res) => {
  client
    .query('SELECT * FROM books')
    .then((response) => {
      res.status(200).json({
        message: 'success',
        data: response.rows,
      })
    })
    .catch((err) => console.log(err))
}

// retrieve books filtering by genre
const findOne = (req, res) => {
  const { genre } = req.body
  client
    .query(`SELECT * FROM books WHERE genre = $1`, [genre])
    .then((response) => {
      if (response.rows.length > 0) {
        return res.status(200).json({ message: 'success', data: response.rows })
      } else {
        return res.status(404).json({ message: 'No books found' })
      }
    })
    .catch((err) => console.log(err))
}

// retrieve book by id
const findById = (req, res) => {
  const { id } = req.body
  client
    .query(`SELECT * FROM books WHERE id = $1`, [id])
    .then((response) => {
      if (response.rows.length > 0) {
        return res.status(200).json({ message: 'success', data: response.rows })
      } else {
        return res.status(404).json({
          message: 'Oops, the book you are looking for does not exist',
        })
      }
    })
    .catch((err) => console.log(err))
}

module.exports = {
  find,
  findOne,
  findById,
}
