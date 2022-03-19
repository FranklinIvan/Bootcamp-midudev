const Note = require('../src/models/Note')
const { connection } = require('mongoose')
const { server } = require('../src/index')
const {
  api,
  initialNotes,
  getAllNotes,
  getAllInfoFromNotes,
  logIn
} = require('./helpers')

beforeEach(async () => {
  await Note.deleteMany({})

  // sequential
  for (const note of initialNotes) {
    const noteObject = new Note(note)
    await noteObject.save()
  }
})

describe('RANDOM', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-type', /application\/json/)
  })

  test('there are 2 notes', async () => {
    const { body } = await getAllNotes()
    expect(body).toHaveLength(initialNotes.length)
  })

  test('the first note is about midudev', async () => {
    const { contents } = await getAllInfoFromNotes()
    expect(contents).toContain(initialNotes[0].content)
  })
})

describe('POST', () => {
  test('a valid note added', async () => {
    const { body: userLogged } = await logIn()
    const { token } = userLogged

    const newNote = {
      content: 'async await',
      important: false
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-type', /application\/json/)

    const { contents } = await getAllInfoFromNotes()
    const { body } = await getAllNotes()

    expect(contents).toContain(newNote.content)
    expect(body).toHaveLength(initialNotes.length + 1)
  })

  test('a note w/out content is not added', async () => {
    const { body: userLogged } = await logIn()
    const { token } = userLogged
    const newNote = {
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    const { body } = await getAllNotes()
    expect(body).toHaveLength(initialNotes.length)
  })

  test('a note w/out important is added correctly', async () => {
    const { body: userLogged } = await logIn()
    const { token } = userLogged
    const newNote = {
      content: 'This is a new note with a important default'
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-type', /application\/json/)

    const { body } = await getAllNotes()
    const { contents } = await getAllInfoFromNotes()
    expect(body).toHaveLength(initialNotes.length + 1)
    expect(contents).toContain(newNote.content)
  })

  test('a invalid note w/ empty fiels is not added', async () => {
    const { body: userLogged } = await logIn()
    const { token } = userLogged
    const newNote = {
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
  })

  test('forgotten token does not allow to save a valid note', async () => {
    const newNote = {
      content: 'valid note but token forgotten',
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(401)

    const { body } = await getAllNotes()
    expect(body).toHaveLength(initialNotes.length)
  })

  test('malformed token does not allow to save a valid note', async () => {
    const { body: userLogged } = await logIn()
    const { token } = userLogged
    const newNote = {
      content: 'valid note but token forgotten',
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .set('Authorization', `Bearer ${token}malforded`)
      .expect(401)

    const { body } = await getAllNotes()
    expect(body).toHaveLength(initialNotes.length)
  })
})

describe('DELETE', () => {
  test('delete a random note', async () => {
    const { body: userLogged } = await logIn()
    const { token } = userLogged
    const { ids } = await getAllInfoFromNotes()
    const nRandom = Math.round(Math.random() * 1)

    await api
      .delete(`/api/notes/${ids[nRandom]}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const response = await getAllNotes()
    expect(response.body).toHaveLength(initialNotes.length - 1)
  })

  test('delete the first note added', async () => {
    const { body: userLogged } = await logIn()
    const { token } = userLogged
    const { body: firtsNotes } = await getAllNotes()

    await api
      .delete(`/api/notes/${firtsNotes[0].id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const { body: lastNotes } = await getAllNotes()
    expect(lastNotes).toHaveLength(firtsNotes.length - 1)
    expect(lastNotes).not.toContain(firtsNotes[0].content)
  })

  // failed delete. Entry to CastError (handleErrors)
  test.skip('try to delete a note w/out id', async () => {
    const { body: userLogged } = await logIn()
    const { token } = userLogged
    await api
      .delete('/api/notes/}')
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    const { body } = await getAllNotes()
    expect(body).toHaveLength(initialNotes.length)
  })

  test('forgotten token does not allow to save a valid note', async () => {
    const { body: firtsNotes } = await getAllNotes()

    await api
      .delete(`/api/notes/${firtsNotes[0].id}`)
      .expect(401)

    const { body: lastNotes } = await getAllNotes()
    const { contents } = await getAllInfoFromNotes()
    expect(lastNotes).toHaveLength(firtsNotes.length)
    expect(contents).toContain(firtsNotes[0].content)
  })
})

describe('PUT', () => {
  test('modify the content of a note', async () => {
    const { body: userLogged } = await logIn()
    const { token } = userLogged
    const newNoteInfo = {
      content: 'new content of a note'
    }
    const { ids } = await getAllInfoFromNotes()

    await api
      .put(`/api/notes/${ids[0]}`)
      .send(newNoteInfo)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-type', /application\/json/)

    const { body: notes } = await getAllNotes()
    const { contents } = await getAllInfoFromNotes()

    expect(contents).toContain(newNoteInfo.content)
    expect(notes).toHaveLength(initialNotes.length)
  })

  test('modify the important of a note', async () => {
    const { body: userLogged } = await logIn()
    const { token } = userLogged
    const newNoteInfo = {
      important: true
    }
    const { body: notes } = await getAllNotes()

    await api
      .put(`/api/notes/${notes[1].id}`)
      .send(newNoteInfo)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-type', /application\/json/)
  })

  test('modify the content/important of a note w/ undefined fields', async () => {
    const { body: userLogged } = await logIn()
    const { token } = userLogged
    const newNote = {
      important: undefined,
      content: undefined
    }

    const { ids } = await getAllInfoFromNotes()

    await api
      .put(`/api/notes/${ids[0]}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newNote)
      .expect(400)
  })

  test('modify the content/important of a note w/ null fields', async () => {
    const { body: userLogged } = await logIn()
    const { token } = userLogged
    const newNote = {
      content: null,
      important: null
    }

    const { body: notes } = await getAllNotes()

    await api
      .put(`/api/notes/${notes[0].id}`)
      .send(newNote)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    const { contents } = await getAllInfoFromNotes()
    expect(contents).not.toContain(newNote.content)
  })

  test('forgotten token does not allow to save a valid note', async () => {
    const newNote = {
      content: 'cannot save it',
      important: true
    }

    const { body: notes } = await getAllNotes()

    await api
      .put(`/api/notes/${notes[0].id}`)
      .send(newNote)
      .expect(401)

    const { contents } = await getAllInfoFromNotes()
    expect(contents).not.toContain(newNote.content)
  })
})

afterAll(() => {
  connection.close()
  server.close()
})
