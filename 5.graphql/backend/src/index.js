import 'dotenv/config'
import { ApolloServer } from 'apollo-server'
import './database/db.js'
import User from './models/User.js'
import jwt from 'jsonwebtoken'
import { typeDefs } from './data-query/type-defs.js'
import { resolvers } from './data-query/resolvers.js'

const JWT_SECRET = process.env.JWT_SECRET

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const token = auth.substring(7)
      const { id } = jwt.verify(token, JWT_SECRET)
      const currentUser = await User.findById(id).populate('friends')
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`server ready at ${url}`)
})
