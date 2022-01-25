import './App.css';
import { useState } from 'react';

export default function App() {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' },
  ])
  const [ newName, setNewName ] = useState('')

  const handleChange = (e) => {
    setNewName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName
    }
    console.log(newPerson);
    setPersons(persons.concat(newPerson))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleChange} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => {
        return <p key={person.name}>{person.name}</p>
      })}
    </div>
  )
}