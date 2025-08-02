const PersonsForm = ({addPerson, newName, handleNewNameChange, newNumber, handleNewNumberChange}) => {

  return(
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} placeholder={'enter name'} onChange={handleNewNameChange}/>
        <br></br>
        number: <input value={newNumber} placeholder={'enter phone number'} onChange={handleNewNumberChange}/>
      </div>
      <div>
        <button  type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonsForm