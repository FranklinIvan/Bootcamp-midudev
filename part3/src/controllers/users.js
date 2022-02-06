const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/User')

router.post('/', async (req, res) => {
  const { body } = req
  const { username, name, password } = body

  console.log({ body })

  const saltRounds = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username,
    name,
    passwordHash
  })

  try {
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
