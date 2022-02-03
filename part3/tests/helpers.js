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

const getAllNotesContents = async () => {
  const response = await api.get('/api/notes')
  const contents = response.body.map(note => note.content)
  return {
    contents,
    response
  }
}

module.exports = { api, initialNotes, getAllNotesContents }
