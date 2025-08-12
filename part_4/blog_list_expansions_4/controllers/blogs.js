const blogRouter = require('express').Router()
const { request } = require('express')
const Blog = require('../models/blog')

blogRouter.get('/',async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/', async (request,response) => {
    const body = request.body

    if (!body.likes) {
        body.likes = 0
    }
    
    const blog = new Blog(body)

    const savedBlog = await blog.save()
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