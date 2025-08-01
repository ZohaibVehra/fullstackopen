import { useState } from 'react'

const ButtonRandAnecdote = ({len, onClick}) => {
  
  return (
    <>
      <button onClick={() => {
        let randNum = Math.floor((Math.random()*len))
        onClick(randNum)}}>
        next anecdote</button>
    </>
  )
}

const ButtonVote = ({index, onClick}) => {

  return (
    <>
      <br></br>
      <button onClick={() => onClick(index)}>vote</button>
    </>
  )
}

const VoteDisplay = ({voteNum}) => {
  if(voteNum == 1){
    return <p>has {voteNum} vote</p>
  }
  return <p>has {voteNum} votes</p>
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const randQuote = (index) => setSelected(index) 
  const addingVote = (index) => {
    const newVotes = [...votes]
    newVotes[index] +=1
    setVotes(newVotes)
  }

  return (
    <div>
      {anecdotes[selected]}
      <VoteDisplay voteNum={votes[selected]} />
      <ButtonVote index={selected} onClick={addingVote} />
      <ButtonRandAnecdote len = {anecdotes.length} onClick={randQuote}/>
    </div>
  )
}

export default App