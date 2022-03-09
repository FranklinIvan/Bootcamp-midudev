import mongoose from 'mongoose'
const connectionString = process.env.MONGODB_URI

mongoose.connect(connectionString)
  .then(() => console.log('database connected'))
  .catch(error => console.log(error))

process.on('uncaughtException', error => {
  console.log(error)
  mongoose.disconnect()
})
