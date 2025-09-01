const { GraphQLError, subscribe } = require('graphql')
const Author = require('./models/Author')
const Book = require('./models/Book')
const LibraryUser = require('./models/LibraryUser')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const jwt = require('jsonwebtoken')

const requireUser = (context) => {
  if (!context.currentUser) {
    throw new GraphQLError('Not authenticated', {
      extensions: { code: 'UNAUTHENTICATED' },
    })
  }

  return context.currentUser
}

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
          const filter = {}
          if (args.author) {
            const a = await Author.findOne({ name: args.author })
            if (!a) return []
            filter.author = a._id
          }
          if (args.genre) filter.genres = args.genre
          return Book.find(filter).populate('author')
        },
        allAuthors: async () => {
          const authors = await Author.find({})
          return authors
        },
        me: (root, args, context) => {
          return context.currentUser
        },
    },
    Author: {
      bookCount: async (root) => {
        return Book.countDocuments({ author: root._id })
      }
    },
    Mutation: {
      addBook: async (root, args, context) => {
        requireUser(context)
        const existing = await Book.findOne({ title: args.title })

        if(existing) {
          throw new GraphQLError('Title must be unique', {
            extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.title }
          })
        }

        let author = await Author.findOne({ name: args.author })
        if (!author) {
          author = await Author.create({ name: args.author })
        }

        const book = await Book.create({
          title: args.title,
          author: author._id,
          published: args.published,
          genres: args.genres,
        })
        const populateBook = await book.populate('author')

        pubsub.publish('BOOK_ADDED', { bookAdded: populateBook })

        return populateBook
      },
      editAuthor: async (root, args, context) => {
        requireUser(context)
        let author = await Author.findOneAndUpdate(
          { name: args.name },
          { $set: { born: args.setBornTo } },
          { new: true }
        )
        return author
      },
      createUser: async (root, args) => {
        const user = new LibraryUser({ username: args.username })

        return user.save()
          .catch(error => {
            throw new GraphQLError('Creating the user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.username,
                error
              }
            })
          })
      },
      login: async (root, args) => {
        const user = await LibraryUser.findOne({ username: args.username })

        if (!user || args.password !== 'password') {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        }

        const userForToken = {
          username: user.username,
          id: user._id
        }

        return { value: jwt.sign(userForToken, process.env.JWT_SECRET, { expiresIn: '1h' }) }
      },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        }
    }
}

module.exports = resolvers