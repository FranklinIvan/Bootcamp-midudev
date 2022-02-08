const router = require('express').Router()
const Note = require('../models/Note')
const User = require('../models/User')

router.get('/', async (_, res) => {
  const notes = await Note.find({}).populate('user', {
    username: 1,
    name: 1
  })

  try {
    res.json(notes)
  } catch (error) {
    console.error(error)
    res.status(404).end()
  }
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params

  const note = await Note.findById(id).populate('user', {
    username: 1,
    name: 1
  })

  try {
    if (note) return res.json(note)
    res.status(404).end()
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res) => {
  const { body } = req
  const { content, important = false, userId } = body

  console.log({ body })

  if (!userId) return res.status(400).end()
  if (!body || content === undefined) return res.status(400).end()
  if (content !== undefined && (content === null || content === '')) return res.status(400).end()

  const user = await User.findById(userId)

  const newNote = new Note({
    content,
    important,
    date: new Date(),
    user: user._id
  })

  try {
    const savedNote = await newNote.save()
    // reference note id to document user
    user.notes = user.notes.concat(savedNote._id)
    await user.save()

    res.status(201).json(savedNote)
  } catch (error) {
    res.status(400).end()
    console.log(error)
  }
})

router.put('/:id', (req, res, next) => {
  const { id } = req.params
  const { body } = req
  const { content, important } = body

  if (!body || Object.keys(body).length === 0) return res.status(400).end()
  if (content !== undefined && (content === '' || content === null)) res.status(400).end()
  if (important !== undefined && !important) return res.status(400).end()

  Note.findByIdAndUpdate(id, body, { new: true })
    .then(changedNote => {
      if (changedNote) return res.json(changedNote)
      res.status(404).end()
    })
    .catch(error => next(error))
})

router.delete('/:id', (req, res, next) => {
  const { id } = req.params

  Note.findByIdAndDelete(id)
    .then(note => {
      if (note) return res.status(204).end()
      res.status(404).end()
    })
    .catch(error => next(error))
})

module.exports = router
