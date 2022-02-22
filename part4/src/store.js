import { combineReducers, createStore } from 'redux'
import { initNotes, noteReducer } from './reducers/noteReducer'
import { filterReducer } from './reducers/filterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import notesServices from './services/notes'

const reducer = combineReducers({
    notes: noteReducer,
    filter: filterReducer
  })

export const store = createStore(reducer, composeWithDevTools())

