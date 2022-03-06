import { gql, useLazyQuery } from "@apollo/client"
import { useState, useEffect } from 'react'

const FIND_PERSON = gql`
  query findPersonByName($name: String!) {
    findPerson(name: $name) {
      name
      phone
      address {
        street
        city
      }
    }
  }
`

export const Persons = ({ persons }) => {
  const [getPerson, result] = useLazyQuery(FIND_PERSON)
  const [person, setPerson] = useState(null)
  console.log(person)

  const showPerson = name => {
    getPerson({ variables: { name } })
  }

  useEffect(() => {
    console.log('enter')
    if(result.data) {
      setPerson(result.data.findPerson)
    }
  }, [result])

  if (person) {
    return (
      <div>
        <p>{person.name}</p>
        <p>{person.phone}</p>
        <p>{person.address.street}, {person.address.city}</p>
        <button onClick={() => getPerson({ variables: { name: '' } })}>close</button>
      </div>
    )
  }

  if (persons === null) return null
  return (
    <div>
      <h2>Persons w/ Phone baby</h2>
      {
        persons.map(person => 
          <div key={person.id} onClick={() => { showPerson(person.name) }}>
            {person.name} {person.phone}
          </div>
        )
      }
    </div>
  )
}
