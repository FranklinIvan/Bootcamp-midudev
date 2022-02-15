import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'this is a test',
    important: true
  }

/*   const component = render(<Note note={note} />)
  component.getByText('this is a test')
  component.getByText('make not important') */

/*   render(<Note note={note} />)
  screen.getByText('this is a test')
  screen.getByText('make not important') */

  const { container } = render(<Note note={note} />)
  expect(container).toHaveTextContent(note.content)
  expect(container).toHaveTextContent('make not important')
})
