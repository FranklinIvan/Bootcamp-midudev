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
  const [getPerson, {data}] = useLazyQuery(FIND_PERSON)
  const [person, setPerson] = useState(null)
  
  const showPerson = name => {
    console.log('showw')
    getPerson({ variables: { name } })
  }
  
  useEffect(() => {
    console.log('enter')
    if(data) {
      setPerson(data.findPerson)
    }
  }, [data])

  console.log({person})
  
  if (person) {
    return (
      <div>
        <p>{person.name}</p>
        <p>{person.phone}</p>
        <p>{person.address.street}, {person.address.city}</p>
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
          <div key={person.id} onClick={() => { showPerson(person.name) }}>
            {person.name} {person.phone}
          </div>
        )
      }
    </div>
  )
}
