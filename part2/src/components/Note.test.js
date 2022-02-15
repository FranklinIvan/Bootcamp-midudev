import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'this is a test',
    important: true
  }

  const view = render(<Note note={note} />)
  view.getByText(note.content)
  view.getByText('make not important')


  /* render(<Note note={note} />)
  screen.getByText(note.content)
  screen.getByText('make not important') */

  /* const { container } = render(<Note note={note} />)
  expect(container).toHaveTextContent(note.content)
  expect(container).toHaveTextContent('make not important') */
})
