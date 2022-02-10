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

const initialUsers = [
  {
    username: 'midudev',
    name: 'midu',
    password: 123
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

const getAllInfoFromUsers = async () => {
  const { body } = await getAllUsers()
  const usernames = body.map(user => user.username)
  const names = body.map(user => user.name)
  return {
    usernames,
    names
  }
}

// login
const logIn = async () => {
  const { username, password } = initialUsers[0]
  const credentials = {
    username,
    password
  }

  const response = await api
    .post('/api/login')
    .send(credentials)

  return response
}

module.exports = {
  api,
  initialNotes,
  initialUsers,
  getAllNotes,
  getAllInfoFromNotes,
  getAllUsers,
  logIn,
  getAllInfoFromUsers
}
