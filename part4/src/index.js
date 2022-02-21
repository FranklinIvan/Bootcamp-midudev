import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { combineReducers, createStore } from 'redux'
import { noteReducer } from './reducers/noteReducer'
import { Provider } from 'react-redux'
import { filterReducer } from './reducers/filterReducer'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})
const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
