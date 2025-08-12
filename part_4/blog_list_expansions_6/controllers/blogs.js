const blogRouter = require('express').Router()
const { request } = require('express')
const User = require('../models/user')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('autorization')
    if (authorization && authorization.startsWith('Bearer')) {
        return authorization.replace('Bearer', '')
    }
    return null
}

blogRouter.get('/',async (request, response) => {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

blogRouter.post('/', async (request,response) => {
    const body = request.body

    if (!body.likes) {
        body.likes = 0
    }
    const user = await User.findOne({})
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    
    response.status(201).json(savedBlog)
})

blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const newLikes = request.body.likes

    const updatedBlog = await Blog
      .findByIdAndUpdate(
        request.params.id, 
        { likes: newLikes },
        { new: true, reunValidators: true, context: 'query'}
    )
    response.json(updatedBlog)
})

module.exports = blogRouter