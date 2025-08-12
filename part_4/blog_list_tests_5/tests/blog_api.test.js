const { test,after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned in json format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

test('correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blogs have an id property and not an _id one', async () => {
    const blogs = await helper.blogsInDb()

    for (let blog of blogs) {
        assert(!blog._id)
        assert.strictEqual(typeof blog.id, 'string')
    }

})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'this is blog three',
        author: 'Bugs Bunny',
        url: 'this/is/a/new/url',
        likes: 9010
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type',/application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()

    const content = blogsAtEnd.map(r => r.title)

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    assert(content.includes('this is blog three'))
})

test('a blog without likes, will have zero likes', async () => {
    const newBlog = {
        title: 'this is blog four',
        author: 'Bugs Everywhere',
        url: 'this/is/url/to/blog'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    const lastBlog = blogsAtEnd.find(r => r.title === 'this is blog four')

    assert.strictEqual(lastBlog.likes, 0)
})

test('blog without title isnt added', async () => {
    const newBlog = {
        author: 'Biggest Bug',
        url: 'this/is/the/url',
        likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('blog without url isnt added', async () => {
    const newBlog = {
        title: 'this blog doesnt exist',
        author: 'next Bug',
        likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    
    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

after(async () => {
    await mongoose.connection.close()
})