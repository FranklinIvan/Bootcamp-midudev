import { gql } from "@apollo/client"

export const ADD_PERSON = gql`
  mutation addPerson(
    $name: String!
    $street: String!
    $phone: String!
    $city: String!
  ) {
    addPerson(name: $name, street: $street, phone: $phone, city: $city) {
      name
      phone
      address {
        city
        street
      }
      id
    }
  }
`