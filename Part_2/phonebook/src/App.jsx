import {useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import PersonsList from './components/PersonsList'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterVal, setFilterVal] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

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
      const exactMatch = persons.some(person => person.name === personObject.name && person.number === personObject.number)
      
      
      if(exactMatch){
        alert(`${newName} already added to phonebook`)
        return
      }

      const nameMatch = persons.find(person => person.name === personObject.name)
      
      const actionToDo = nameMatch ?
        () => {
          let conf = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
          if (conf){
            return personService.update(nameMatch.id, personObject)
            .then(updatedPerson => {
              setPersons(persons.map(person => updatedPerson.id === person.id ? updatedPerson : person))
              setNotificationMessage(`${newName} had their number updated`)
              setTimeout(() => {
                setNotificationMessage(null)
              }, 3000)
            }).catch(error => {
              setNotificationMessage(`Information of '${newName}' has already been removed from server`)
              setPersons(persons.filter(person => person.id !== nameMatch.id))
              setTimeout(() => {
                setNotificationMessage(null)
              }, 3000)
            })
          }
          return Promise.resolve()//have to return some promise or the .then later breaks
        }
        : () => {
          return personService.create(personObject)
            .then(returnedPerson => {
              setPersons(persons.concat(returnedPerson))
              setNotificationMessage(`${newName} was added`)
              setTimeout(() => {
                setNotificationMessage(null)
              }, 3000)
            })
        }

        actionToDo().then(() => {
          setNewName('')
          setNewNumber('')
        }).catch( err => console.log(err) )
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
      <Notification message={notificationMessage} />
      <Filter filterVal={filterVal} handleFilterChange={handleFilterChange} />

      <h3>Add a new person</h3>

      <PersonsForm addPerson={addPerson} newName={newName} handleNewNameChange={handleNewNameChange} newNumber={newNumber} handleNewNumberChange={handleNewNumberChange} />

      <h3>Numbers</h3>
      <PersonsList personsToShow={personsToShow} delPerson={delPerson} />
      
    </div>
  )
}

export default App