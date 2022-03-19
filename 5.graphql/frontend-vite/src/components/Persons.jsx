import { useState, useEffect } from "react"
import { useFindPerson } from "../persons/custom-hooks"

// this not works as expected, i do not understand wtf is useEffect working
export const Persons = ({ persons }) => {
  const [getPerson, result] = useFindPerson()
  const [person, setPerson] = useState(null)

  const showPerson = name => getPerson({ variables: { name } })
  const closePerson = () => getPerson({variables : { name: '' }})
  
  useEffect(() => {
    if (result.data) setPerson(result.data.findPerson)
  }, [result.data])

  if (person) {
    return (
      <div>
        <h2>{person.name}</h2>
        <p>{person.phone}</p>
        <button onClick={closePerson}>close</button>
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
