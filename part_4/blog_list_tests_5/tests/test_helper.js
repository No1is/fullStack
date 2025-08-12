const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'this is first blog',
        author: 'zero bugs',
        url: 'url/to/this/blog',
        likes: 9001
    },
    {
        title: 'this is blog two',
        author: 'mike okin',
        url: 'this/is/another/url',
        likes: 9002
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
}