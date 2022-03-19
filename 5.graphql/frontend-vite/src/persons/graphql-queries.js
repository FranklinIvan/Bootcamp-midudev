import { gql } from "@apollo/client"

export const ALL_PERSONS = gql`
  query allPersons{
    allPersons(phone: YES) {
      id
      name
      phone
      address {
        street
        city
      }
    }
  }
`

export const FIND_PERSON = gql`
  query findPerson($name: String!) {
    findPerson(name: $name) {
      id
      name
      phone
    }
  }
`