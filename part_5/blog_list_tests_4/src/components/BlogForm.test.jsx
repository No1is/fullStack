import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('input fields and create button received when creating new blog', async ( ) => {
    const createBlog = vi.fn()
    render(<BlogForm createBlog={createBlog} />)

    const user = userEvent.setup()
    const inputs = screen.getAllByRole('textbox')
    const button = screen.getByText('create')

    await user.type(inputs[0], 'this is title')
    await user.type(inputs[1], 'this is author')
    await user.type(inputs[2], 'this is url')
    await user.click(button)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('this is title')
    expect(createBlog.mock.calls[0][0].author).toBe('this is author')
    expect(createBlog.mock.calls[0][0].url).toBe('this is url')
})