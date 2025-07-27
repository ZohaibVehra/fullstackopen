const Header = () => {
  const course = 'Half Stack application development'
  return(
    
    <h1>{course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  const part1 = props.exercises[0].name
  const exercises1 = props.exercises[0].exercises
  const part2 = props.exercises[1].name
  const exercises2 = props.exercises[1].exercises
  const part3 = props.exercises[2].name
  const exercises3 = props.exercises[2].exercises
  

  return(
    <>
      <Part name={part1} exercises={exercises1}/>
      <Part name={part2} exercises={exercises2}/>
      <Part name={part3} exercises={exercises3}/>
    </>
  )
}

const Total = (props) =>{
  return(
    <p>Number of exercises {props.exercises}</p>
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
      <Header />
      <Content exercises={[part1,part2,part3]} />
      <Total exercises={part1.exercises + part2.exercises +part3.exercises}/>
    </div>
  )
}

export default App