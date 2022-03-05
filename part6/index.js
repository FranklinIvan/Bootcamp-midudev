import {ApolloServer, gql, UserInputError} from 'apollo-server'
import {v1 as uuid} from 'uuid'
import axios from 'axios'

const persons = [
  {
    name: 'Franko',
    phone: '09-1235-212',
    street: 'Lovesno',
    city: 'NY city',
    id: '295d9ddb-1bf0-410b-9c3d-094ec7e0d22d'
  },
  {
    name: 'Midudev',
    phone: '87-1214-233',
    street: 'Morato',
    city: 'Barcelona',
    id: '1f3a7334-4cb3-4bf9-8196-313e13577e6d'
  },
  {
    name: 'Cristiano',
    street: 'DuMundo',
    city: 'Portugalo City',
    id: '7f8b744c-ed7e-4643-baa8-612a9671018b'
  }
]

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
    personCount: () => persons.length,
    allPersons: async (root, args) => {
      const {data: personsAPI} = await axios.get('http://localhost:3000/persons')
      if (!args.phone) return personsAPI

      const byPhone = person => {
        return args.phone === 'YES' ? person.phone : !person.phone
      }

      return personsAPI.filter(byPhone)
    },
    findPerson: (root, args) => {
      const {name} = args
      return persons.find(person => person.name === name)
    }
  },
  Mutation: {
    addPerson: (root, args) => {
      if (persons.find(p => p.name === args.name)) {
        throw new UserInputError('Name must be unique', {
          invalidArgs: args.name
        })
      }
      const person = {...args, id: uuid()}
      persons.push(person)
      return person
    },
    editNumber: (root, args) => {
      const personIndex = persons.findIndex(p => p.name === args.name)
      if (personIndex === -1) return null

      const person = persons[personIndex]

      const updatedPerson = {...person, phone: args.phone}
      persons[personIndex] = updatedPerson
      return updatedPerson
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

server.listen().then(({url}) => {
  console.log(`server ready at ${url}`)
})