const router = require('express').Router()
const User = require('../models/User')

router.post('/', async (req, res) => {
  const { body } = req
  const { username, name, password } = body

  const newUser = new User({
    username,
    name,
    passwordHash: password
  })

  const savedUser = await newUser.save()
  res.json(savedUser)
})

module.exports = router
