const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.post('/', async (req, res) => {
  const { body } = req
  const { username } = body
  let { password } = body
  // console.log({ body })

  const user = await User.findOne({ username })

  if (!password || !user) return res.status(401).end()
  if (typeof password !== 'string') password = password.toString()
  const passwordCorrect = await bcrypt.compare(password, user.passwordHash)

  if (!passwordCorrect) {
    return res.status(401).json({
      error: true,
      message: 'invalid user or password'
    })
  }

  const userForToken = {
    id: user._id,
    username: user.username
  }

  const token = jwt.sign(userForToken, process.env.SECRET_JWT, {
    expiresIn: 60 * 60 * 24 * 7
  })

  res.send({
    name: user.name,
    username: user.username,
    token
  })
})

module.exports = router
