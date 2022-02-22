import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducer'
import notesServices from '../services/notes'

export default function FormNote () {
  const dispatch = useDispatch()

  const addNote = async e => {
    e.preventDefault()
    const { target } = e
    const content = target.note.value
    target.note.value = ''

    const newNote = await notesServices.createNewNote(content)

    dispatch(createNote(newNote))
  }

  return (
    <form onSubmit={addNote}>
      <input type='text' name='note' />
      <button>save</button>
    </form>
  )
}
