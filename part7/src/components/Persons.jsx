export const Persons = ({ persons }) => {
  if (persons === null) return null
  return (
    <div>
      <h2>Persons w/ Phone baby</h2>
      {
        persons.map(person => 
          <div key={person.id} >
            {person.name} {person.phone}
          </div>
        )
      }
    </div>
  )
}
