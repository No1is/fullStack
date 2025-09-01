const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const LibraryUser = require('./models/LibraryUser')

require('dotenv').config()

mongoose.set('strictQuery', false)
const Author = require('./models/Author')
const Book = require('./models/Book')

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

const typeDefs = `
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    bookCount: Int!
    born: Int
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

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
        allAuthors: async () => Author.find({}),
        me: (root, args, context) => {
          return context.currentUser
        }
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

        return book.populate('author')
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
      }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      const auth = req?.headers?.authorization ?? null
      if (auth && auth.startsWith('Bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7), process.env.JWT_SECRET
        )
        const currentUser = await LibraryUser
          .findById(decodedToken.id)
        return { currentUser }
      }
      return {}
    },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
