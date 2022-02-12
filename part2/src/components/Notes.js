export default function ({ notes, toggleImportance }) {
  return (
    <ol>
      {
          notes.map(note =>
            <li key={note.id}>
              <span>{note.content}</span>
              <button onClick={toggleImportance}>{note.important ? 'make not important' : 'make important'}</button>
            </li>
          )
        }
    </ol>
  )
}
