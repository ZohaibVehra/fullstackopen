import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Display = ({good, neutral, bad}) => {
  return (
    <p>
      good {good} <br />
      neutral {neutral} <br />
      bad {bad}
    </p>
     
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
      <h1>statistics</h1>
      <Display good={good} bad={bad} neutral = {neutral}/>
    </div>
  )
}

export default App