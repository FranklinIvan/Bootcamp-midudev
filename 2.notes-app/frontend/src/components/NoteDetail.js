import { useParams } from "react-router-dom"
import { useNotes } from "../hooks/useNotes"

export default function NoteDetail () {
  const { notes } = useNotes()
  const { id } = useParams()
  const note = notes.find(note => note.id === id)
  
  if (!note) return null

  return(
    <div>
      <h1>Note Detail</h1>
      <p>{note.user.username}</p>
      <p>Note: {note.content}</p>
      <strong>{ note.important ? 'important' : ''}</strong>
    </div>
  )
}