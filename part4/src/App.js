import { useDispatch, useSelector } from 'react-redux'
import { createNote, toggleImportanceOf } from './reducers/noteReducer'

export default function App () {
  const state = useSelector(state => state)
  const dispatch = useDispatch()

  const addNote = e => {
    e.preventDefault()
    const {target} = e
    const content = target.note.value
    target.note.value = ''

    dispatch(createNote(content))
  }

  const toggleImportant = id => dispatch(toggleImportanceOf(id))

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