const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
      {props.part.map((value,index) => <Part key={index} part={value} />)}
    </div>
  )
}

const Total = (props) => {
    let sum = 0
    props.part.forEach(value => sum += value.exercises)
  return (
    <div>
      <p>Number of exercises {sum}</p>
    </div>
  )
}



const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  

  return (
    <div>
      <Header course={course} />
      <Content part={parts} />
      <Total part={parts} />
    </div>
  )
}

export default App