import { useState } from 'react'

const Anecdote= (props) => {
  const anecdotes = props.anecdote

  return (
    <div>
      {anecdotes[props.selected]}
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const LineStatistics = (props) => {return (<><td>{props.text}:</td><td>{props.value}</td></>)}

const Statistics = (props) => {
  return(
  <>
  <table>
    <tbody>
    <tr><LineStatistics text='good' value={props.good}/></tr>
    <tr><LineStatistics text='neutral' value={props.neutral}/></tr>
    <tr><LineStatistics text='bad' value={props.bad}/></tr>
    <tr><LineStatistics text='total' value={props.good + props.neutral + props.bad}/></tr>
    <tr><LineStatistics text='average' value={(props.good * 1) + (props.neutral * 0) + (props.bad * -1)} /></tr>
    <tr><LineStatistics text='positive' value={props.good * 100 / (props.good + props.neutral + props.bad) || 0} /></tr>
    </tbody>
  </table>  
      </>)

}

const AllStatistics = (props) => { 
    if (props.good + props.neutral + props.bad > 0) {
      return(
      <Statistics good={props.good} bad={props.bad} neutral={props.neutral}/>)
      }
    return (
      <p>No feedback given</p>
    )

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
  let votesObject = {}
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(() => 
    {for (let i = 0; i < anecdotes.length; i++) {
    votesObject[i] = 0
      }
    return votesObject})

  const handleGoodClick = (props) => setGood(good + 1)
  const handleNeutralClick = (props) => setNeutral(neutral + 1)
  const handleBadClick = (props) => setBad(bad + 1)
  const handleAnecdoteClick = (props) => setSelected( Math.floor(Math.random() * (8)))
  const handleVoteAnecdoteClick = (props) => {
    const newobject = {...votes};
    newobject[selected] += 1;
    setVotes(newobject);
  }
 const handleMostVotedAnecdote = () => {
    let j = 0
    for (let i = 0; i < anecdotes.length; i++){
    if (votes[i] > votes[j]) {
      j = i
    }
    console.log(j)
  }
  return j}
  
  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      <AllStatistics good={good} neutral={neutral} bad={bad} />
      <br />
      <h1>Anecdote of the day</h1>
      <Anecdote selected={selected} anecdote={anecdotes} />
      <p>has {votes[selected]} votes</p>
      <Button handleClick={handleVoteAnecdoteClick} text='Vote' />
      <Button handleClick={handleAnecdoteClick} text='next anecdote' />
      <h1>Anecdote with most votes:</h1>
     
      <Anecdote anecdote={anecdotes} selected= {handleMostVotedAnecdote()}/>
    </>

  )
}

export default App