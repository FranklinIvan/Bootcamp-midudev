export const noteReducer = (state = [], { type, payload }) => {
  if (type === '@note/created') {
    return state.concat(payload)
  }

  if (type === '@note/toggle_important') {
    const { id } = payload
    return state.map(note => {
      if (note.id === id) {
        note.important = !note.important
      }
      return note
    })
    // const note = state.find(n => n.id === id)
    // console.log({ note })
    // const changedNote = {
    //   ...note,
    //   important: !note.important
    // }
    // return state.map(n => n.id === id ? changedNote : note)
  }

  return state
}
