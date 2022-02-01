require('dotenv').config()
const { connect } = require('mongoose')

const URI = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.stxmk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

connect(URI)
  .then(() => console.log('database connected'))
  .catch(error => console.log(error))
