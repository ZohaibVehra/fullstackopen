import {useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import PersonsList from './components/PersonsList'
import personService from './services/persons'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterVal, setFilterVal] = useState('')

  useEffect( () => {
    personService.getAll()
      .then(personsArr => setPersons(personsArr))
  } ,[])

  const addPerson = (event) => {
    event.preventDefault()
    if(!/^\d+$/.test(newNumber.replace(/-/g, ""))){
      alert(`number section may only contain numbers and dashes`)
    }
    else{
      const personObject = {name: newName, number: newNumber}
      if(!persons.some(person => JSON.stringify(person) === JSON.stringify(personObject))){
        personService.create({name: newName, number: newNumber}).then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(err => console.log(err))
        
      }
      else{
        alert(`${newName} is already added to phonebook`)
      }
    }
  } 

  const handleFilterChange = event => setFilterVal(event.target.value)
  const handleNewNameChange = event => setNewName(event.target.value)
  const handleNewNumberChange = event => setNewNumber(event.target.value)

  const personsToShow = filterVal === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filterVal.toLowerCase()))
  
  const delPerson = (id, name) => {
    const conf = window.confirm(`delete ${name}?`)
    if(conf){
      personService
      .remove(id)
      .then(() => setPersons(persons.filter(person => person.id !== id)))
    }
  } 
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterVal={filterVal} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonsForm addPerson={addPerson} newName={newName} handleNewNameChange={handleNewNameChange} newNumber={newNumber} handleNewNumberChange={handleNewNumberChange} />

      <h3>Numbers</h3>
      <PersonsList personsToShow={personsToShow} delPerson={delPerson} />
      
    </div>
  )
}

export default App