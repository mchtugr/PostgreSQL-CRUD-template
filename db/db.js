const { Client } = require('pg')

const client = new Client({
  host: 'localhost',
  user: process.env.DB_USER,
  port: 5432,
  password: process.env.DB_PASSWORD,
  database: 'postgres',
})

client.connect()

module.exports = client
