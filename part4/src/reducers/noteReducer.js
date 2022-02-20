export const noteReducer = (state = [], { type, payload }) => {
  if (type === '@note/created') {
    return [...state, payload]
  }

  if (type === '@note/toggle_important') {
    const { id } = payload
    return state.map(note => {
      if (note.id === id) {
        return {
          ...note,
          important: !note.important
        }
      }
      return note
    })
  }

  return state
}
