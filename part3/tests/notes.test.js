const Note = require('../src/models/Note')
const { connection } = require('mongoose')
const { server } = require('../index')
const { api, initialNotes, getAllContentFromNotes } = require('./helpers')

beforeEach(async () => {
  await Note.deleteMany({})

  const note1 = new Note(initialNotes[0])
  await note1.save()

  const note2 = new Note(initialNotes[1])
  await note2.save()
})

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-type', /application\/json/)
})

test('there are 2 notes', async () => {
  const response = await api.get('/api/notes')
  expect(response.body).toHaveLength(initialNotes.length)
})

test('the first note is about midudev', async () => {
  const { contents } = await getAllContentFromNotes()

  expect(contents).toContain('Learning FullStack w/ midudev')
})

test('a valid note added', async () => {
  const newNote = {
    content: 'async await',
    important: false
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-type', /application\/json/)

  const { contents, response } = await getAllContentFromNotes()

  expect(contents).toContain(newNote.content)
  expect(response.body).toHaveLength(initialNotes.length + 1)
})

test('a note w/out content is not added', async () => {
  const newNote = {
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  const response = await api.get('/api/notes')
  expect(response.body).toHaveLength(initialNotes.length)
})

afterAll(() => {
  connection.close()
  server.close()
})
