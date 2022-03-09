import 'dotenv/config'
import { ApolloServer, gql, UserInputError } from 'apollo-server'
import personsServices from './services/persons.js'
import './database/db.js'

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
    personCount: async () => {
      const persons = await personsServices.getAllPersons()
      return persons.length
    },
    allPersons: async (root, args) => {
      const persons = await personsServices.getAllPersons()
      if (!args.phone) return persons

      const byPhone = person => {
        return person.phone
      }

      return persons.filter(byPhone)
    },
    findPerson: async (root, args) => {
      const person = await personsServices.getOnePerson(args.name)
      return person
    }
  },
  Mutation: {
    addPerson: async (root, args) => {
      const person = await personsServices.getOnePerson(args.name)

      if (person) {
        throw new UserInputError('Name must be unique', {
          invalidArgs: args.name
        })
      }
      const newPerson = await personsServices.addNewPerson(args)
      return newPerson
    },
    editNumber: async (root, args) => {
      const person = await personsServices.getOnePerson(args.name)

      if (typeof person === 'undefined') {
        throw new UserInputError('Name not found', {
          invalidArgs: args.name
        })
      }

      const editedNumber = await personsServices.uptadePerson(args)
      return editedNumber
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
