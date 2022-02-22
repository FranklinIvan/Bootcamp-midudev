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

const generateId = () => Math.floor(Math.random() * 999999) + 1

export const createNote = content => {
  return {
    type: '@note/created',
    payload: {
      id: generateId(),
      content,
      important: Math.random() > 0.5
    }
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
