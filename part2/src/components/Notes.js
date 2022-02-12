export default function ({ notes, toggleImportance }) {
  return (
    <ol>
      {
        notes.map(note => {
          const label = note.important ? 'make not important' : 'make important'
          return (
            <li key={note.id}>
              <span>{note.content}</span>
              <button onClick={toggleImportance}>{label}</button>
            </li>
          )
        })
      }
    </ol>
  )
}
