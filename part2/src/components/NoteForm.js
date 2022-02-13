export default function RenderCreateNoteForm ({ handleSubmitNote, handleLogout, handleChangeNote, value }) {
  return (
    <>
      <form onSubmit={handleSubmitNote}>
        <input
          type='text'
          placeholder='write your new note'
          onChange={handleChangeNote}
          value={value}
        />
        <button>create note</button>
      </form>
      <br />
      <div>
        <button onClick={handleLogout}>log out</button>
      </div>
    </>

  )
}
