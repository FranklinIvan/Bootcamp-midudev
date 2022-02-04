const Note = require('../src/models/Note')
const { connection } = require('mongoose')
const { server } = require('../index')
const {
  api,
  initialNotes,
  getAllNotes,
  getAllInfoFromNotes
} = require('./helpers')

beforeEach(async () => {
  await Note.deleteMany({})

  const note1 = new Note(initialNotes[0])
  await note1.save()

  const note2 = new Note(initialNotes[1])
  await note2.save()
})

describe('RANDOM', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-type', /application\/json/)
  })

  test('there are 2 notes', async () => {
    const response = await getAllNotes()
    expect(response.body).toHaveLength(initialNotes.length)
  })

  test('the first note is about midudev', async () => {
    const { contents } = await getAllInfoFromNotes()

    expect(contents).toContain('Learning FullStack w/ midudev')
  })
})

describe('POST', () => {
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

    const { contents } = await getAllInfoFromNotes()
    const response = await getAllNotes()

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

    const response = await getAllNotes()
    expect(response.body).toHaveLength(initialNotes.length)
  })
})

describe('DELETE', () => {
  test('delete a random note', async () => {
    const { ids } = await getAllInfoFromNotes()
    const nRandom = Math.round(Math.random() * 1)

    await api
      .delete(`/api/notes/${ids[nRandom]}`)
      .expect(204)

    const response = await getAllNotes()
    expect(response.body).toHaveLength(initialNotes.length - 1)
  })

  // failed delete. Entry to CastError (handleErrors)
  test.skip('try to delete a note w/out id', async () => {
    await api
      .delete('/api/notes/}')
      .expect(400)

    const response = await getAllNotes()
    expect(response.body).toHaveLength(initialNotes.length)
  })
})

describe('PUT', () => {
  test('modify the content of a note', async () => {
    const newNoteInfo = {
      content: 'new content of a note'
    }
    const { ids } = await getAllInfoFromNotes()

    await api
      .put(`/api/notes/${ids[0]}`)
      .send(newNoteInfo)
      .expect(200)
      .expect('Content-type', /application\/json/)

    const response = await getAllNotes()
    const { contents } = await getAllInfoFromNotes()

    expect(contents).toContain(newNoteInfo.content)
    expect(response.body).toHaveLength(initialNotes.length)
  })

  test('modify the content/important of a note w/ undefined fields', async () => {
    const newNote = {
      important: undefined,
      content: undefined
    }

    const { ids } = await getAllInfoFromNotes()

    await api
      .put(`/api/notes/${ids[0]}`)
      .send(newNote)
      .expect(400)
  })

  test('modify the content/important of a note w/ null fields', async () => {
    const newNote = {}

    const { ids } = await getAllInfoFromNotes()

    await api
      .put(`/api/notes/${ids[0]}`)
      .send(newNote)
      .expect(400)

    const { contents } = await getAllInfoFromNotes()
    console.log(contents)
  })
})

afterAll(() => {
  connection.close()
  server.close()
})
