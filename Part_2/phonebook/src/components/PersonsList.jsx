const PersonRender = ({person, delPerson}) => {
  return(
    <li>{person.name} {person.number} <button onClick={delPerson}>delete</button></li>
  )
}

const PersonsList = ({personsToShow, delPerson}) => {
  return (
    <ul>
        {personsToShow.map((person)=> 
          <PersonRender key={person.id} person={person} delPerson={()=> delPerson(person.id, person.name)}/>
        )}
    </ul>
  )
}

export default PersonsList