const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

router.post('/', async (req, res) => {
  const { body } = req
  const { username, password } = body

  const user = await User.findOne({ username })

  const passwordCorrect = !user
    ? null
    : await bcrypt.compare(password, user.passwordHash)

  if (!passwordCorrect) {
    return res.json({
      error: true,
      message: 'invalid user or password'
    })
  }

  res.json(user)
})

module.exports = router
