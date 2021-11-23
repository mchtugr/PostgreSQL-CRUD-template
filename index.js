require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.status(200).json({ message: 'success' })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server started on port: ${port}`)
})
