import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { createNote, noteReducer, toggleImportanceOf } from './reducers/noteReducer'

const store = createStore(noteReducer)

function App () {
  const state = store.getState()

  const addNote = (e) => {
    e.preventDefault()
    const {target} = e
    const content = target.note.value
    target.note.value = ''

    store.dispatch(createNote(content))
  }

  const toggleImportant = id => store.dispatch(toggleImportanceOf(id))

  return (
    <div>
      <form onSubmit={addNote}>
        <input type='text' name='note'/>
        <button>save</button>
      </form>
      <ul>
      {
        state.map(note => {
          return (
            <li key={note.id} onClick={() => toggleImportant(note.id)}>
              {note.content}
              <strong>{note.important ? ' important' : ' not important'}</strong>
            </li>
          )
        })
      }
    </ul>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
}

renderApp()
store.subscribe(renderApp)
