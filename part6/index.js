import {ApolloServer, gql} from 'apollo-server'

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
  type Address {
    street: String!,
    city: String!
  }

  type Person {
    name: String!,
    phone: String,
    address: Address!,
    id: ID!
  }

  type Query {
    personCount: Int!,
    allPersons: [Person]!,
    findPerson(name: String!): Person
  }
`

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    findPerson: (root, args) => {
      const {name} = args
      return persons.find(person => person.name === name)
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