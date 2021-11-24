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
    .catch((err) => res.status(400).json({ message: err.detail }))
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
    .catch((err) => res.status(400).json({ message: err.detail }))
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
    .catch((err) => res.status(400).json({ message: err.detail }))
}

// create new book
const create = (req, res) => {
  const { title, author, pageCount, id, genre } = req.body
  client
    .query(`INSERT INTO books VALUES ($1, $2, $3, $4, $5) RETURNING *`, [
      title,
      author,
      pageCount,
      id,
      genre,
    ])
    .then((response) =>
      res.status(201).json({
        message: 'The book Successfully saved to DB',
        data: response.rows,
      })
    )
    .catch((err) => res.status(400).json({ message: err.detail }))
}

// update a book collection
const updateOne = (req, res) => {
  const { id, genre } = req.body
  client
    .query('UPDATE books SET genre = $2 WHERE id = $1 RETURNING *', [id, genre])
    .then((response) => {
      res.status(200).json({ message: 'success', data: response.rows })
    })
    .catch((err) => res.status(400).json({ message: err.detail }))
}

// delete a a book collection

const removeOne = (req, res) => {
  const { id } = req.body
  client
    .query('DELETE FROM books WHERE id= $1', [id])
    .then(() => res.status(200).json({ message: 'success' }))
    .catch(() => res.status(400).json({ message: 'Something happened!' }))
}

module.exports = {
  find,
  findOne,
  findById,
  create,
  updateOne,
  removeOne,
}
