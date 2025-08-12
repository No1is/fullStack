const { test,describe } = require('node:test')
const assert = require('node:assert')

const mostBlogs = require('../utils/list_helper').mostBlogs

describe('most blogs', () => {
    const listWithZero = []

    test('with a list of zero blogs', () => {
        const result = mostBlogs(listWithZero)

        assert.deepStrictEqual(result, 0)
    })

    const listWithOneblog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            blogs: 5,
            __v: 0
        }
    ]

    test('with a list of one blog', () => {
        const result = mostBlogs(listWithOneblog)
        const compare = {
            author: listWithOneblog[0].author,
            blogs: listWithOneblog[0].blogs
        }

        assert.deepStrictEqual(result, compare)
    })

    const listWithThreeblogs = [
        {
            _id: 'gds21t33t',
            title: 'dont do it',
            author: 'No Bugs',
            url: 'http://localhost:3001',
            blogs: 10,
            __v: 0
        },
        {
            _id: 'gds21gsag33t',
            title: 'ill be back',
            author: 'Zero Bugs',
            url: 'http://localhost:3001',
            blogs: 20,
            __v: 0
        },
        {
            _id: 'gds215215312t',
            title: 'master of the universe',
            author: 'Bugz Control',
            url: 'http://localhost:3001',
            blogs: 30,
            __v: 0
        }
    ]

    test('list with more than one blog', () => {
        const result = mostBlogs(listWithThreeblogs)
        const compare = {
            author: listWithThreeblogs[2].author,
            blogs: listWithThreeblogs[2].blogs
        }
    })
})