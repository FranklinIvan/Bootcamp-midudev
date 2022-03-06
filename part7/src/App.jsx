import logo from './logo.svg'
import './App.css'
import { gql, useQuery } from '@apollo/client'
import { Persons } from './components/Persons'

const ALL_PERSONS = gql`
  query {
    allPersons(phone: YES) {
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

function App() {
  const { data, error, loading } = useQuery(ALL_PERSONS)

  if (error) return <span>{error}</span>

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {
          loading
            ? <p>suck my dick...</p>
            : <Persons persons={data?.allPersons} />
        }
      </header>
    </div>
  )
}

export default App
