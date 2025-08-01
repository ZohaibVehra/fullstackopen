import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>


const Avg = ({good,bad,neutral}) => <p>average {(good-bad)/(good+bad+neutral)}</p>
const Positive = ({good,bad,neutral}) =>  <p>positive {(good*100)/(good+bad+neutral)}%</p>

const StatisticLine = ({value, text}) => <p>{text} {value}</p>

const Statistics = (props) => {
  let {good, bad, neutral} = props
  
  if(good==0 && bad==0 && neutral==0){
    return <p>No feedback given</p>
  }

  return (
    <div>
      <h1>statistics</h1>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <Avg good={good} bad={bad} neutral = {neutral}/>
      <Positive good={good} bad={bad} neutral = {neutral}/>
    </div>
  )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' onClick={() => setGood(good+1)}/>
      <Button text='neutral' onClick={() => setNeutral(neutral+1)}/>
      <Button text='bad'  onClick={() => setBad(bad+1)}/>
      
      <Statistics good={good} bad={bad} neutral = {neutral} />
      
    </div>
  )
}

export default App