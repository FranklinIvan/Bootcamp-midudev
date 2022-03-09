import 'dotenv/config'
import { ApolloServer, gql, UserInputError } from 'apollo-server'
import './database/db.js'
import Person from './models/Person.js'

const typeDefs = gql`
  enum YesNo {
    YES
    NO
  }

  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(
      name: String!
      phone: String!
    ): Person
  }
`

const resolvers = {
  Query: {
    personCount: async () => await Person.countDocuments(),
    allPersons: async (root, args) => {
      if (!args.phone) return await Person.find({})
      return await Person.find({ phone: { $exists: args.phone === 'YES' } })
    },
    findPerson: async (root, args) => await Person.findOne({ name: args.name })
  },
  Mutation: {
    addPerson: async (root, args) => {
      const person = new Person(args)

      try {
        await person.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return person
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name })
      if (!person) return

      person.phone = args.phone

      try {
        await person.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return person
    }
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`server ready at ${url}`)
})
