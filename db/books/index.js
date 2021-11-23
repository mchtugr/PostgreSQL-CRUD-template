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

module.exports = {
  getAll,
}
