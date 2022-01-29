import ReactDOM from 'react-dom'
import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios';

// Ejercicios: 2.11.-2.14.

// components
const Find = ({ handleChange, value, text }) => <>{text} <input onChange={handleChange} value={value} /> <br /></>

const LookingCountries = ({find}) => {
  return (
    <>
      {
        find.length > 10
        ? 'too many matches, specify another filter'
        : find.map(country => <p key={country.name}>{country.name}</p>)
      }
    </>
  )
}

const CountryData = ({ find }) => {
  return (
    <>
      {
        find.length === 1
        ?
        <div>
          <h1>{find[0].name}</h1>
          <p>capital {find[0].capital}</p>
          <p>population {find[0].population}</p>
          <h3>languages</h3>
          {find[0].languages.map(l => <ul key={l.name}><li>{l.name}</li></ul>)}
          <img src={find[0].flag} alt='' className='img' />
        </div>

        : <LookingCountries find={find} />
      }
    </>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v2/all').then(json => {
      const { data } = json
      setCountries(data)
    })
  }, [])

  const handleChange = e => {
    setFilter(e.target.value);
  }

  const find = countries.filter(country =>
    country.name.toLowerCase().includes(filter.toLowerCase()))

  console.log(find);


  return (
    <div>
      <Find handleChange={handleChange} value={filter} text={'find countries'} />
      {
        find.length === Math.max(countries.length)
        ? ''
        : <CountryData find={find} countries={countries} />
      }
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)