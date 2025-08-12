import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

test('renders blog likes and url when view button clicked', async () => {
    const blog = {
        title: 'this is another test',
        author: 'test blog',
        url: 'this url shows',
        likes: 1,
        user: {
            username: 'testblog',
            name: 'test blog',
        }
    }

    const { container } = render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = container.querySelector('.url')
    const likes = container.querySelector('.likes')

    expect(url).toHaveTextContent('this url shows')
    expect(likes).toHaveTextContent('likes 1')
})

test('addlikes is called twice if clicked twice', async () => {
    const blog = {
        title: 'testing likes button',
        author: 'blog tester',
        url: 'likes test url',
        like: 2,
        user: {
            username: 'blogtester',
            name: 'blog tester',
        }
    }
    
    const addLikes = vi.fn()

    const { container } = render(<Blog blog={blog} addLikes={addLikes} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const like = screen.getByText('like')
    await user.click(like)
    await user.click(like)

    expect(addLikes.mock.calls).toHaveLength(2)
})