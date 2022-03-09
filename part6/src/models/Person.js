import { Schema, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const personSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String
  },
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
})

personSchema.plugin(uniqueValidator)

export default model('Person', personSchema)
