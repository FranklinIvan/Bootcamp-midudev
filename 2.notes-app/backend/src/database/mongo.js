require('dotenv').config()
const { connect, disconnect } = require('mongoose')

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test'
  ? MONGO_DB_URI_TEST
  : MONGO_DB_URI

// esto se lo agregué para el test, no entiendo del todo*
// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true
// }

connect(connectionString)
  .then(() => console.log('database connected'))
  .catch(error => console.error(error))

process.on('uncaughtException', error => {
  console.error(error)
  disconnect()
})
