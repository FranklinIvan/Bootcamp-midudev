const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/User')

router.get('/', async (_, res) => {
  const users = await User.find({}).populate('notes')

  try {
    res.json(users)
  } catch (error) {
    console.log(error)
    res.status(400).end()
  }
})

router.post('/', async (req, res, next) => {
  const { body } = req
  const { username, name } = body
  let { password } = body

  console.log({ body })

  if (!body || Object.values(body) === 0) return res.status(400).end()
  if (!username || !name || !password) return res.status(400).end()
  if (typeof password !== 'string') password = password.toString()

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
    next(error)
  }
})

module.exports = router
