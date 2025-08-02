import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const newNameObject = {name: newName}
    if(!persons.some(person => JSON.stringify(person) === JSON.stringify(newNameObject))){
      setPersons(persons.concat({name: newName}))
      setNewName('')
    }
    else{
      alert(`${newName} is already added to phonebook`)
    }
  } 

  const handleNewNameChange = event => setNewName(event.target.value)
  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} placeholder={'enter a new name'} onChange={handleNewNameChange}/>
        </div>
        <div>
          <button  type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person)=> <li key={person.name}>{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App