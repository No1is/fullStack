const express = require('express')
const app = express()
app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


const generateId = () => {
  min = Math.ceil(persons.length)
  return String(Math.floor(Math.random() + (min + 1)))
}

app.use((req,res,next) => {
  req.requestStartTime = new Date()
  next()
})

app.get('/api/persons', (request,response) => {
    response.json(persons)
})

app.get('/info', (request,response) => {
  response.send(
    `<div><p>Phonebook has info for ${persons.length} people<p></div>
    <div><p>${request.requestStartTime.toString()}<p></div>`
  )
})

app.get('/api/persons/:id',(request,response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  person? response.json(person):response.status(404).end()
})

app.delete('/api/persons/:id',(request,response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)
  
  response.status(204).end()
})

app.post('/api/persons',(request,response) => {
  console.log(persons.length)
  const body = request.body
  
  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  } else if (!body.number) {
    return response.status(400).json({
      error: 'number is missing'
    })
  } else if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  
  const person = {
    id : generateId(),
    name: body.name,
    number: body.number? body.number : ''
  }
  
  persons = persons.concat(person)
  console.log(persons.length)

  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
})