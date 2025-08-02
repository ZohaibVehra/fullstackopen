import {useState } from 'react'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import PersonsList from './components/PersonsList'




const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterVal, setFilterVal] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if(!/^\d+$/.test(newNumber.replace(/-/g, ""))){
      alert(`number section may only contain numbers and dashes`)
    }
    const personObject = {name: newName, number: newNumber}
    if(!persons.some(person => JSON.stringify(person) === JSON.stringify(personObject))){
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