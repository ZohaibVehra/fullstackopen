import {useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import PersonsList from './components/PersonsList'
import axios from 'axios'




const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterVal, setFilterVal] = useState('')

  useEffect( () => {
    axios
      .get('http://localhost:3002/persons')
      .then(response => setPersons(response.data))
  } ,[])

  const addPerson = (event) => {
    event.preventDefault()
    if(!/^\d+$/.test(newNumber.replace(/-/g, ""))){
      alert(`number section may only contain numbers and dashes`)
    }
    const personObject = {name: newName, number: newNumber}
    if(!persons.some(person => JSON.stringify(person) === JSON.stringify(personObject))){
      axios.post('http://localhost:3002/persons', {name: newName, number: newNumber})
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
    }
    else{
      alert(`${newName} is already added to phonebook`)
    }
  } 

  const handleFilterChange = event => setFilterVal(event.target.value)
  const handleNewNameChange = event => setNewName(event.target.value)
  const handleNewNumberChange = event => setNewNumber(event.target.value)

  const personsToShow = filterVal === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filterVal.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterVal={filterVal} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonsForm addPerson={addPerson} newName={newName} handleNewNameChange={handleNewNameChange} newNumber={newNumber} handleNewNumberChange={handleNewNumberChange} />

      <h3>Numbers</h3>
      <PersonsList personsToShow={personsToShow} />
      
    </div>
  )
}

export default App