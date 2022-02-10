const { server } = require('../index')
const { connection } = require('mongoose')
const {
  api,
  getAllInfoFromUsers
} = require('./helpers')

describe('POST', () => {
  test('valid credentials allow log in', async () => {
    const credentials = {
      username: 'midudev',
      password: '123'
    }

    await api
      .post('/api/login')
      .send(credentials)
      .expect(200)

    const { usernames } = await getAllInfoFromUsers()
    expect(usernames).toContain(credentials.username)
  })

  test('invalid credentials w/out password does not allow log in', async () => {
    const credentials = {
      username: 'midudev'
    }

    await api
      .post('/api/login')
      .send(credentials)
      .expect(401)
  })

  test('invalid credentials w/out username does not allow log in', async () => {
    const credentials = {
      password: 123
    }

    await api
      .post('/api/login')
      .send(credentials)
      .expect(401)
  })

  test('invalid credentials w/ empty fields does not allow log in', async () => {
    const credentials = {}

    await api
      .post('/api/login')
      .send(credentials)
      .expect(401)
  })

  test('invalid credentials w/ null fields does not allow log in', async () => {
    const credentials = {
      username: null,
      password: null
    }

    await api
      .post('/api/login')
      .send(credentials)
      .expect(401)
  })

  test('invalid credentials w/ empty strings does not allow log in', async () => {
    const credentials = {
      username: '',
      password: ''
    }

    await api
      .post('/api/login')
      .send(credentials)
      .expect(401)
  })
})

afterAll(() => {
  server.close()
  connection.close()
})
