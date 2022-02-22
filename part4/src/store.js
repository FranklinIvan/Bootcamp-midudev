import { combineReducers, createStore } from 'redux'
import { noteReducer } from './reducers/noteReducer'
import { filterReducer } from './reducers/filterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
    notes: noteReducer,
    filter: filterReducer
  })

export const store = createStore(reducer, composeWithDevTools())

