import { Link } from "react-router-dom"

export default function Note ({ note, toggleImportance }) {
  const label = note.important
    ? 'make not important'
    : 'make important'

  return (
    <div>
      <li>
        <Link to={`/notes/${note.id}`}>
          {note.content}
        </Link>
        <button onClick={toggleImportance}>{label}</button>
      </li>
    </div>
  )
}
