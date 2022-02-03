const supertest = require('supertest')
const { app } = require('../index')
const api = supertest(app)

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
  const response = await getAllNotes()
  const ids = response.body.map(note => note.id)
  const contents = response.body.map(note => note.content)
  return {
    ids,
    contents
  }
}

module.exports = {
  api,
  initialNotes,
  getAllNotes,
  getAllInfoFromNotes
}
