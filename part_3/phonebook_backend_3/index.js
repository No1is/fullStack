const express = require('express')
const app = express()

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

const PORT = 3001
app.listen(PORT, () => {
})
