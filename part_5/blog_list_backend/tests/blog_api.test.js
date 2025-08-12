const { test,after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const api = supertest(app)

let token = null
beforeEach(async () => {
    const response = await api
      .post('/api/login')
      .send({ username: 'root', password: 'password' })

    token = response.body.token
})

const auth = {
    post: (url) => api.post(url).set('Authorization', `Bearer ${token}`),
    delete: (url) => api.delete(url).set('Authorization', `Bearer ${token}`)
}

describe('when there is initially some blogs saved', () => {
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
})

describe('valid blogs can be created', () => {

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'this is blog three',
      author: 'Bugs Bunny',
      url: 'this/is/a/new/url',
      likes: 9010
    }

    await auth
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

    await auth
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    const lastBlog = blogsAtEnd.find(r => r.title === 'this is blog four')

    assert.strictEqual(lastBlog.likes, 0)
  })

  test('blog without title isnt added', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = {
        author: 'Biggest Bug',
        url: 'this/is/the/url',
        likes: 1
    }

    await auth
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })

  test('blog without url isnt added', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = {
        title: 'this blog doesnt exist',
        author: 'next Bug',
        likes: 1
    }

    await auth
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    
    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })


})

describe('blogs can be deleted', () => {
  test('blog can be found with valid id', async () => {
    const blogs = await helper.blogsInDb()
    const blogToView = blogs[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect(`Content-Type`,/application\/json/)
    
    assert.deepStrictEqual(resultBlog.body,blogToView)
  })

  test('blog can be deleted', async () => {
    const blogs = await helper.blogsInDb()
    const ind = blogs.length - 1
    const blogToDelete = blogs[ind]
    const decoded = jwt.verify(token,process.env.SECRET)
    console.log('blog', blogToDelete)
    console.log('user', blogToDelete.user._id.toString())
    console.log('id', decoded.id)

    await auth
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const blogAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogAtEnd.length, blogs.length - 1)
  })
})

describe('blogs can be updated', () => {
  test('update likes for existing blog', async () => {
    const blogs = await helper.blogsInDb()
    const blogToUpdate = blogs[0]
    const newLikes = { likes: 9020 }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newLikes)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, blogs.length)
    assert.strictEqual(blogsAtEnd[0].likes, newLikes.likes)
  })
})


describe('adding a user to db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('password', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('create new user', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'zerobugs',
            name: 'Zero Bugs',
            password: 'password',
        }

        await api
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })

    test('user with empty username field will not be created', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            name: 'ab',
            password: 'password',
        }

        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('user with empty password field will not be created', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'test',
            name: 'test',
        }

        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
    
    test('user with invalid username will not be created', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'ab',
            name: 'a b',
            password: 'password',
        }

        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
        
        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('user with invalid password will not be created', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'test',
            name: 'test',
            password: 'ab'
        }

        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
        
        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
})


after(async () => {
    await mongoose.connection.close()
})