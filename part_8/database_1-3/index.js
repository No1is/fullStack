const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')

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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]!
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
  }
`

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
        allAuthors: async () => Author.find({})
    },
    Author: {
      bookCount: async (root) => {
        return Book.countDocuments({ author: root._id })
      }
    },
    Mutation: {
      addBook: async (root, args) => {
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
      editAuthor: async (root, args) => {
        let author = await Author.findOneAndUpdate(
          { name: args.name },
          { $set: { born: args.setBornTo } },
          { new: true }
        )
        return author
      }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

startStandaloneServer(server, {
    listen: { port: 4000 },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})