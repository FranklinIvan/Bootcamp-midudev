import { useSelector, useDispatch } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

export default function Notes () {
  const notes = useSelector(state => state)
  const dispatch = useDispatch()

  const toggleImportant = id => dispatch(toggleImportanceOf(id))

  return (
    <ul>
      {
        notes.map(note => {
          return (
            <li key={note.id} onClick={() => toggleImportant(note.id)}>
              {note.content}
              <strong>
                {note.important ? ' important' : ' not important'}
              </strong>
            </li>
          )
        })
        }
    </ul>
  )
}
