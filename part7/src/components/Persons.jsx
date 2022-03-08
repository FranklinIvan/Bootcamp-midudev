import { gql, useLazyQuery } from "@apollo/client"
import { useState, useEffect } from "react"

const FIND_PERSON = gql`
  query findPerson($name: String!) {
    findPerson(name: $name) {
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

// this not works as expected, i do not understand wtf is useEffect working
export const Persons = ({ persons }) => {
  const [getPerson, result] = useLazyQuery(FIND_PERSON)
  const [person, setPerson] = useState(null)

  const showPerson = name => {
    getPerson({ variables: { name } })
  }

  useEffect(() => {
    if (result.data) {
      setPerson(result.data.findPerson)
    }
  }, [result.data])

  if (person) {
    return (
      <div>
        <h2>asd</h2>
        <p>{person.name}</p>
        <button onClick={() => setPerson(null)}>close</button>
      </div>
    )
  }

  if (persons === null) return null
  return (
    <div>
      <h2>Persons w/ Phone baby</h2>
      {
        persons.map(person => 
          <div key={person.id} onClick={() => showPerson(person.name)}>
            {person.name} {person.phone}
          </div>
        )
      }
    </div>
  )
}
