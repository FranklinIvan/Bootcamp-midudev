const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: {
    type: String
  },
  name: {
    type: String
  },
  passwordHash: {
    type: String
  },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = model('User', userSchema)
