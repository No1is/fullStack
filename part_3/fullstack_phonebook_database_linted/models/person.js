const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3,'name must be at least 3 characters long'],
    required: [true, 'name is missing'],
  },
  number: {
    type: String,
    minLength: [8,'number must be at least 8 characters long'],
    validate: {
      validator: (number) => {
        return /\d{2}-\d{8}/.test(number)||/\d{3}-\d{7}/.test(number)
      },
      message: 'number must follow format example: 12-12345678 or 123-1234567',
    },
    required: [true,'number is missing'],
  },
})

personSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)