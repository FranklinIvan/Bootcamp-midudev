export default function RenderCreateNoteForm ({ handleSubmitNote, type, placeholder, handleLogout, handleChangeNote, value }) {
  return (
    <>
      <form onSubmit={handleSubmitNote}>
        <input
          type={type}
          placeholder={placeholder}
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
