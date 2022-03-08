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