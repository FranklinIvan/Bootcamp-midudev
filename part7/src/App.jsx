import logo from './logo.svg'
import './App.css'
import { Persons } from './components/Persons'
import { PhoneForm } from './components/PhoneForm'
import { PersonForm } from './components/PersonForm'
import { usePersons } from './persons/custom-hooks'
import { useState } from 'react'
import { LoginForm } from './components/LoginForm'

function App() {
  const { data, error, loading } = usePersons()
  const [token, setToken] = useState(() => window.localStorage.getItem('phonenumbers-user-token'))

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
        {!token && <LoginForm setToken={setToken} />}
        <PhoneForm />
        <PersonForm />
      </header>
    </div>
  )
}

export default App
