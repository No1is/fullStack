require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)

morgan.token('body', req => {
  return JSON.stringify(req.body)
})
app.use(express.json())
app.use(express.static('dist'))

app.use((req,res,next) => {
  req.requestStartTime = new Date()
  next()
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/api/persons', (request,response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
})

app.get('/info', (request,response) => {
  Person.countDocuments().then(total => {
    response.send(
      `<div><p>Phonebook has info for ${total} people</p></div>
      <div><p>${request.requestStartTime.toString()}</p></div>`
    )
  })
})

app.get('/api/persons/:id',(request,response) => {
  Person.findById(request.params.id).then(person => {
    person? response.json(person):response.status(404).end()
  })
})

app.delete('/api/persons/:id',(request,response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
})

app.post('/api/persons',(request,response) => {
  const body = request.body
  
  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  } else if (!body.number) {
    return response.status(400).json({
      error: 'number is missing'
    })
  }

  Person.findOne({name: body.name})
    .then(existingPerson => {
      if (existingPerson) {
        return response.status(400).json({
          error: 'name must be unique'
        })
      }
      const person = new Person({
        name: body.name,
        number: body.number,
      })
      person.save().then(savedPerson => {
        response.json(savedPerson)
      })
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})