let todoCounter = 1;


const Header = (props) => <h1>{props.course}</h1>

const Content = ({parts}) => (
  <div>
    {parts.map((part) => <Part key={todoCounter++} part={part} /> )}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => <p>Number of exercises {props.total}</p>

const Course = ({course}) => {
  const {name, parts} = course
  


  return(
    <div>
      <Header course={name} />

      <Content parts={parts} />
    
      <Total
        
        total={
          parts[0].exercises +
          parts[1].exercises +
          parts[2].exercises
        }
      />
    </div>
  )
  
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}


export default App