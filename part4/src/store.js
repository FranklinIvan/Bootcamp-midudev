import { combineReducers, createStore } from 'redux'
import { noteReducer } from './reducers/noteReducer'
import { filterReducer } from './reducers/filterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import notesServices from './services/notes'

const reducer = combineReducers({
    notes: noteReducer,
    filter: filterReducer
  })

export const store = createStore(reducer, composeWithDevTools())

notesServices.getAllNotes().then(notes => {
  notes.forEach(note => {
    store.dispatch({
      type: '@note/created',
      payload: note
    })
  })
})