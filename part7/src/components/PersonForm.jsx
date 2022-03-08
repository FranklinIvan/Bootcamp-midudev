import { gql, useMutation } from "@apollo/client"
import { useState } from "react"
import { ALL_PERSONS } from "../App"

const ADD_PERSON = gql`
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

export const PersonForm = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  const [createPerson] = useMutation(ADD_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }]
  })

  const handleSubmit = e => {
    e.preventDefault()

    createPerson({ variables: { name, phone, street, city } })

    setName('')
    setPhone('')
    setStreet('')
    setCity('')
  }

  return (
    <div>
      <h4>Add new person</h4>
      <form onSubmit={handleSubmit}>
        <input placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
        <input placeholder='Phone' value={phone} onChange={e => setPhone(e.target.value)} />
        <input placeholder='City' value={city} onChange={e => setCity(e.target.value)} />
        <input placeholder='Street' value={street} onChange={e => setStreet(e.target.value)} />
        <div>
          <button>add</button>
        </div>
      </form>
    </div>
  )
}