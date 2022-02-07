const supertest = require('supertest')
const { app } = require('../index')
const api = supertest(app)

// notes
const initialNotes = [
  {
    content: 'Learning FullStack w/ midudev',
    important: true,
    date: new Date()
  },
  {
    content: 'My english is so basic',
    important: true,
    date: new Date()
  }
]

const getAllNotes = async () => {
  const response = await api.get('/api/notes')
  return response
}

const getAllInfoFromNotes = async () => {
  const { body } = await getAllNotes()
  const ids = body.map(note => note.id)
  const contents = body.map(note => note.content)
  return {
    ids,
    contents
  }
}

// users
const getAllUsers = async () => {
  const response = await api.get('/api/users')
  return response
}

module.exports = {
  api,
  initialNotes,
  getAllNotes,
  getAllInfoFromNotes,
  getAllUsers
}
