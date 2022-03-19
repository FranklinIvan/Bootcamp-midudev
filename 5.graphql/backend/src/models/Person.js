import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  phone: {
    type: String,
    minlength: 4
  },
  city: {
    type: String,
    required: true,
    minlength: 3
  },
  street: {
    type: String,
    required: true,
    minlength: 4
  }
})

// personSchema.plugin(uniqueValidator)

export default mongoose.model('Person', personSchema)
