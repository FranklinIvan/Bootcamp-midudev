import ReactDOM from 'react-dom'
import './App.css';
import { useState } from 'react';

// Ejercicios: 2.6.-2.10.

// components
const Filter = ({ text, handleFilter, value }) => <>{text} <input onChange={handleFilter} value={value} /> </>

const PersonForm = ({ submit, handleChangeName, handleChangeNumber, valueName, valueNumber, txt1, txt2 }) => {

  return (
    <form onSubmit={submit}>
      <p>
        {txt1} <input onChange={handleChangeName} value={valueName} required />
      </p>
      <p>
        {txt2} <input onChange={handleChangeNumber} value={valueNumber} required />
      </p>
      <>
        <button>add</button>
      </>
    </form>
  )
}

const Person = ({ persons, filter }) => {

  return (
    <>
      {
        filter.length > 0
          ? filter[0].name + ' ' + filter[0].number
          : persons.map(person => <p key={person.name}> {person.name} {person.number}</p>)
      }
    </>
  )
}

const INITIAL_PERSONS_STATE = [
  { name: 'Arto Hellas', number: '040-123456' },
  { name: 'Ada Lovelace', number: '39-44-5323523' },
  { name: 'Dan Abramov', number: '12-43-234345' },
  { name: 'Mary Poppendieck', number: '39-23-6423122' }
]

export default function App() {
  const [persons, setPersons] = useState(INITIAL_PERSONS_STATE)
  const [newContact, setnewContact] = useState({ name: '', number: '' })
  const [filterName, setFilterName] = useState('')

  const handleChangeName = e => {
    const copy = { ...newContact }
    copy.name = e.target.value
    setnewContact(copy);
  }

  const handleChangeNumber = e => {
    const copy = { ...newContact }
    copy.number = e.target.value
    setnewContact(copy)
  }

  const handleFilter = e => {
    setFilterName(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault();

    const newPerson = {
      name: newContact.name,
      number: newContact.number
    }

    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newPerson.name) {
        alert(`${newPerson.name} already added to the phonebook`)
        return
      }
    }

    setPersons(persons.concat(newPerson))
  }

  const filter = persons.filter(person => person.name.toLowerCase() === filterName.toLowerCase())

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter text={'filter shown with'} handleFilter={handleFilter} value={filterName} />

      <h3>Add a new</h3>

      <PersonForm
        submit={handleSubmit}
        handleChangeName={handleChangeName}
        valueName={newContact.name}
        txt1={'name:'}
        handleChangeNumber={handleChangeNumber}
        valueNumber={newContact.number}
        txt2={'number:'}
      />

      <h3>Numbers</h3>

      <Person persons={persons} filter={filter} />

    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)