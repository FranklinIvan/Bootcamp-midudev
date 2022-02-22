export const noteReducer = (state = [], { type, payload }) => {
  if (type === '@note/init') {
    return payload
  }

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

export const createNote = note => {
  return {
    type: '@note/created',
    payload: note
  }
}

export const toggleImportanceOf = id => {
  return {
    type: '@note/toggle_important',
    payload: {
      id
    }
  }
}

export const initNotes = notes => {
  return {
    type: '@note/init',
    payload: notes
  }
}
