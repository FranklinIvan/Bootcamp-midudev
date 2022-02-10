const bcrypt = require('bcrypt')
const User = require('../src/models/User')
const { connection } = require('mongoose')
const { server } = require('../index')
const {
  api,
  initialUsers,
  getAllUsers
} = require('./helpers')

beforeEach(async () => {
  await User.deleteMany({})

  for (const user of initialUsers) {
    const { username, name, password } = user
    const passwordHash = await bcrypt.hash(password.toString(), 10)
    const newUser = new User({
      username,
      name,
      passwordHash
    })

    await newUser.save()
  }
})

describe('RANDOM', () => {
  test.skip('works as expected creating a new user', async () => {
    const users = await User.find({})

    expect(users).toHaveLength(1)
  })
})

describe('POST', () => {
  test('a valid user added', async () => {
    const { body: firstUsers } = await getAllUsers()
    const newUser = {
      username: 'frank',
      name: 'franklin',
      password: '123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-type', /application\/json/)

    const { body: lastUsers } = await getAllUsers()
    expect(lastUsers).toHaveLength(firstUsers.length + 1)
    const usernames = lastUsers.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('a invalid user w/out content is not added', async () => {
    const { body: firstUsers } = await getAllUsers()
    const newUser = {}

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const { body: lastUsers } = await getAllUsers()
    expect(lastUsers).toHaveLength(firstUsers.length)
  })

  test('a user w/out password is not added', async () => {
    const { body: firstUsers } = await getAllUsers()
    const newUser = {
      username: 'frank',
      name: 'franklin'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const { body: lastUsers } = await getAllUsers()
    expect(lastUsers).toHaveLength(firstUsers.length)
  })

  test('a user w/out username is not added', async () => {
    const newUser = {
      name: 'franklin',
      password: '123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('a invalid user w/ undefined fields', async () => {
    const newUser = {
      username: undefined,
      name: undefined,
      password: undefined
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('a invalid user w/ null fields', async () => {
    const newUser = {
      username: null,
      name: null,
      password: null
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('fails when trying to insert a user that was already taken', async () => {
    const { body: firstUsers } = await getAllUsers()
    const newUser = {
      username: 'midudev',
      name: 'midu',
      password: 123
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(409)
      .expect('Content-type', /application\/json/)

    const { body: lastUsers } = await getAllUsers()
    expect(lastUsers).toHaveLength(firstUsers.length)
  })
})

afterAll(() => {
  server.close()
  connection.close()
})
