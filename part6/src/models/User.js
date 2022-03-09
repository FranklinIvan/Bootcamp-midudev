import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  friends: [
    {
      ref: 'Person',
      type: mongoose.Schema.Types.ObjectId
    }
  ]
})

userSchema.plugin(uniqueValidator)

export default mongoose.model('User', userSchema)
