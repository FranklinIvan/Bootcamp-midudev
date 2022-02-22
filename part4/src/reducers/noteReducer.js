import notesServices from '../services/notes'

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

export const initNotes = () => {
  return async dispatch => {
    const notes = await notesServices.getAllNotes()

    dispatch ({
      type: '@note/init',
      payload: notes
    })
  }
}
