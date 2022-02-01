const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
  content: {
    type: String
  },
  date: {
    type: Date
  },
  important: {
    type: Boolean
  }
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = model('Note', noteSchema)
