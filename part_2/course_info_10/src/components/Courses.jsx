const Header = ({ course }) => <h2>{course.name}</h2>
    
const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => <div>{parts.map((part) => <Part key={part.id} part={part} />)}</div>

const Total = ({ parts }) => {
    const total = parts.reduce((accumulator, part) => accumulator +  part.exercises, 0)
  return (
    <div>
      <p><strong>total of {total} exercises</strong></p>
    </div>
  )
}

const Courses =({ courses }) => {
  return (
    <div>
      {courses.map((course) =>(
        <div key={course.id}>
          <Header course={course} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </div>
  )
}

export default Courses