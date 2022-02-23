import { useSelector, useDispatch } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

export default function Notes () {
  const dispatch = useDispatch()

  const notes = useSelector(state => state.notes)
  const filter = useSelector(state => state.filter)

  const toggleImportant = async id => dispatch(toggleImportanceOf(id))

  const notesToShow = notes.filter(notes => {
    if (filter === 'all') return notes
    if (filter === 'important') return notes.important
    if (filter === 'not_important') return !notes.important

    return notes
  })

  return (
    <ul>
      {
        notesToShow.map(note => {
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
