import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function Note ({ note, toggleImportance }) {
  const label = note.important
    ? 'make not important'
    : 'make important'

  return (
    <>
      <td>
        <Link to={`/notes/${note.id}`}>
          {note.content}
        </Link>
      </td>
      <td>
        <Button onClick={toggleImportance}>{label}</Button>
      </td>
    </>
  )
}
