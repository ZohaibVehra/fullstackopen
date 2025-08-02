


const Header = (props) => <h2>{props.course}</h2>

const Content = ({parts}) => (
  <div>
    {parts.map((part) => <Part key={part.id} part={part} /> )}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => <p><b>Total of {props.total} exercises</b></p>

const Course = ({course}) => {
  const {name, parts} = course
  


  return(
    <div>
      <Header course={name} />

      <Content parts={parts} />

      <Total  total={parts.reduce((acc, curr) => acc+curr.exercises,0 )} />
    </div>
  )
  
}

export default Course