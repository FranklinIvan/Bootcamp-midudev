import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'

const noteReducer = (state = [], action) => {
  if (action.type === '@note/created'){
   return state.concat(action.payload)
  }

  return state
}

const store = createStore(noteReducer)

store.dispatch({
  type: '@note/created',
  payload: {
    content: 'i love midu classes',
    important: true,
    id: 1
  }
})
store.dispatch({
  type: '@note/created',
  payload: {
    content: 'but, im hungry',
    important: false,
    id: 2
  }
})

function App () {
  const state = store.getState()
  return (
    <ul>
      {
        state.map(note => {
          return (
            <li key={note.id}>
              {note.content}
              <strong>{note.important ? ' important' : ' not important'}</strong>
            </li>
          )
        })
      }
    </ul>
  )
}

const renderApp = () => {
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
}

renderApp()
store.subscribe(renderApp)