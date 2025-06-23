require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

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


app.get('/api/persons', (request,response,next) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))
})

app.get('/info', (request,response,next) => {
  Person.countDocuments().then(total => {
    response.send(
      `<div><p>Phonebook has info for ${total} people</p></div>
      <div><p>${request.requestStartTime.toString()}</p></div>`
    )
  })
  .catch(error => next(error))
})

app.get('/api/persons/:id',(request,response,next) => {
  Person.findById(request.params.id).then(person => {
    person? response.json(person):response.status(404).end()
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id',(request,response,next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons',(request,response,next) => {
  const body = request.body
  
  if (!body.name || body.name.trim() === '') {
    return response.status(400).json({
      error: 'name is missing'
    })
  } 

  if (!body.number || body.number.trim() === '') {
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
      .catch(error => next(error))
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: 'unknown endpoint'
  })
}

app.use(unknownEndpoint)

const errorHandler = (error,request,response,next) => {
  console.log(error.message)
  
  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformatted id'
    })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})