const router = require('express').Router()
const Note = require('../models/Note')

router.get('/', async (_, res) => {
  const notes = await Note.find({})

  try {
    res.json(notes)
  } catch (error) {
    console.error(error)
    res.status(404).end()
  }
})

router.get('/:id', (req, res, next) => {
  const { id } = req.params

  Note.findById(id)
    .then(note => {
      if (note) return res.json(note)
      res.status(404).end()
    })
    .catch(error => next(error))
})

router.post('/', (req, res) => {
  const { body } = req
  const { content, important } = body

  if (!body || !content) {
    return res.status(400).json({
      error: true,
      message: 'no content, check and try again'
    })
  }

  const newNote = new Note({
    content,
    important: typeof important !== 'undefined' ? important : false,
    date: new Date().toISOString()
  })

  newNote.save()
    .then(result => res.status(201).json(result))
    .catch(error => console.error(error))
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
