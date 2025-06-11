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
    props.exercises.forEach(value => sum += value)
  return (
    <div>
      <p>Number of exercises {sum}</p>
    </div>
  )
}



const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  

  return (
    <div>
      <Header course={course} />
      <Content part={[part1,part2,part3]} />
      <Total exercises={[part1.exercises,part2.exercises,part3.exercises]} />
    </div>
  )
}

export default App