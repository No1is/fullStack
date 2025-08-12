import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders default blog', () => {
    const blog = {
        title: 'this is test blog',
        author: 'test blog',
        url: 'test url',
        likes: 0,
    }

    render(<Blog blog={blog} />)

    const element = screen.getByText('this is test blog test blog')
    expect(element).toBeDefined()
})