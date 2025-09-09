require('dotenv').config()

const URL = process.env.NODE_ENV === 'test'
  ? process.env.TEST_URL
  : process.env.URL
const PORT = process.env.PORT

module.exports = { URL, PORT }