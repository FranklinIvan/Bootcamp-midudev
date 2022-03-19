import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import Toggleable from './Toggleable'

const label = 'show'
const setup = () => render(
    <Toggleable labelButton={label}>
        <div className='testDiv'>testDivContent</div>
    </Toggleable>
)

describe('<Toggleable />', () => {
    test('render its children', () => {
        setup()
        expect(screen.getByText('testDivContent')).toBeInTheDocument()
    })

    test('render its children but they are not visible', () => {
        setup()
        const el = screen.getByText('testDivContent')
        expect(el.parentNode).toHaveStyle('display: none')
    })

    test('after clicking its children must be shown', () => {
        setup()

        const button = screen.getByText(label)
        fireEvent.click(button)

        const el = screen.getByText('testDivContent')
        expect(el.parentNode).not.toHaveStyle('display: none')
        expect(el.parentNode).toHaveStyle('display: block')
    })

    test('toggled content can be closed', () => {
        setup()

        const showButton = screen.getByText(label)
        fireEvent.click(showButton)

        const el = screen.getByText('testDivContent')
        expect(el.parentNode).not.toHaveStyle('display: none')

        const cancelButton = screen.getByText('cancel')
        fireEvent.click(cancelButton)

        expect(el.parentNode).toHaveStyle('display: none')
    })
})