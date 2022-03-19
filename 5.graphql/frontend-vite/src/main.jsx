import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {ApolloClient, HttpLink, InMemoryCache, ApolloProvider} from '@apollo/client'

const getAuth = () => {
  const token = window.localStorage.getItem('phonenumbers-user-token')
  return token ? `Bearer ${token}` : null
}

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    headers: {
      Authorization: getAuth()
    },
    uri: 'http://localhost:4000/'
  })
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
