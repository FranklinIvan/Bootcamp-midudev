import logo from './logo.svg'
import './App.css'
import { Persons } from './components/Persons'
import { PhoneForm } from './components/PhoneForm'
import { PersonForm } from './components/PersonForm'
import { usePersons } from './persons/custom-hooks'

function App() {
  const { data, error, loading } = usePersons()

  if (error) return <span>{error}</span>

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {
          loading
            ? <p>loading...</p>
            : <Persons persons={data?.allPersons} />
        }
        <PhoneForm />
        <PersonForm />
      </header>
    </div>
  )
}

export default App
