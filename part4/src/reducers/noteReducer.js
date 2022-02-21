const INITIAL_STATE = [
  {
    content: 'hi, my name is franklon',
    important: false,
    id: 1
  },
  {
    content: 'i really like working very much!!',
    important: true,
    id: 2
  },
]

export const noteReducer = (state = INITIAL_STATE, { type, payload }) => {
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
