const blogRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')


blogRouter.get('/',async (request, response) => {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request,response) => {
    const body = request.body
    const userId = request.user

    if (!userId) {
        return response.status(400).json({ error: 'userId not found or invalid'})
    }

    if (!body.likes) {
        body.likes = 0
    }
    
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: userId,
    })

    const user = await User.findById(userId)
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    
    response.status(201).json(savedBlog)
})

blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        return response.status(404).json({ error: 'blog not found' })
    }

    const user = request.user

    if (!user) {
        return response.status(401).json({ error: 'invalid token'})
    }

    if (blog.user.toString() === user.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } else {
        return response.status(403).json({ error: 'unauthorized to delete this blog' })
    }
})

blogRouter.put('/:id', async (request, response) => {
    const newLikes = request.body.likes

    const updatedBlog = await Blog
      .findByIdAndUpdate(
        request.params.id, 
        { likes: newLikes },
        { new: true, runValidators: true, context: 'query'}
    ).populate('user', { username: 1, name: 1 })
    response.json(updatedBlog)
})

module.exports = blogRouter