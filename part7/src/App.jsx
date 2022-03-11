import logo from './logo.svg'
import './App.css'
import { useState } from 'react'
import { Persons } from './components/Persons'
import { PhoneForm } from './components/PhoneForm'
import { LoginForm } from './components/LoginForm'
import { PersonForm } from './components/PersonForm'
import { useLogout } from './login/custom-hooks'
import { usePersons } from './persons/custom-hooks'

function App() {
  const { data, error, loading } = usePersons()
  const [token, setToken] = useState(() => window.localStorage.getItem('phonenumbers-user-token'))
  const client = useLogout()

  if (error) return <span>{error}</span>

  const logout = () => {
    setToken(null)
    window.localStorage.removeItem('phonenumbers-user-token')
    client.resetStore()
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {
          loading
            ? <p>loading...</p>
            : <Persons persons={data?.allPersons} />
        }
        {
          token
            ? <button onClick={logout}>log out</button>
            : <LoginForm setToken={setToken} />
        }
        <PhoneForm />
        <PersonForm />
      </header>
    </div>
  )
}

export default App
