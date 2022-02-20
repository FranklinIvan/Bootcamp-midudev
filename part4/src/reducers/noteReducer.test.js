import deepFreeze from 'deep-freeze'
import { noteReducer } from './noteReducer'

describe('noteReducer', () => {
  test('returns a new state after action w/ toggle importance', () => {
    const state = [
      {
        content: 'note1',
        important: false,
        id: 1
      },
      {
        content: 'note2',
        important: false,
        id: 2
      }
    ]

    const action = {
      type: '@note/toggle_important',
      payload: {
        id: 2
      }
    }

    deepFreeze(state)
    const newState = noteReducer(state, action)

    expect(newState).toHaveLength(2)
    expect(newState).toContainEqual(state[0])
    expect(newState).toContainEqual({
      content: 'note2',
      important: true,
      id: 2
    })
  })
})
