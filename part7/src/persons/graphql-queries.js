import { gql } from "@apollo/client"

export const ALL_PERSONS = gql`
  query {
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