const { test, describe } = require('node:test')
const assert = require('node:assert')

const totalLikes = require('../utils/list_helper').totalLikes

describe('total likes', () => {
    const listWithZero = []

    test('of empty list is zero', () => {
        const result = totalLikes(listWithZero)
        assert.strictEqual(result, 0)
    })
    
    const listWithOneblog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = totalLikes(listWithOneblog)
        assert.strictEqual(result, 5)
    })

    const listWithThreeblogs = [
        {
            _id: 'gds21t33t',
            title: 'dont do it',
            author: 'zero bugs',
            url: 'http://localhost:3001',
            likes: 10,
            __v: 0
        },
        {
            _id: 'gds21gsag33t',
            title: 'ill be back',
            author: 'zero bugs',
            url: 'http://localhost:3001',
            likes: 20,
            __v: 0
        },
        {
            _id: 'gds215215312t',
            title: 'master of the universe',
            author: 'zero bugs',
            url: 'http://localhost:3001',
            likes: 30,
            __v: 0
        }
    ]

    test('of a bigger list is calculated right', () => {
        const result = totalLikes(listWithThreeblogs)
        assert.strictEqual(result, 60)
    })
})