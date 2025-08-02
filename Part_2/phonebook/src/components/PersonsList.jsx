let counter = 0;

const PersonRender = ({person}) => <li>{person.name} {person.number}</li>

const PersonsList = ({personsToShow}) => {

  return (
    <ul>
        {personsToShow.map((person)=> <PersonRender key={counter++} person={person}/>)}
    </ul>
  )
}

export default PersonsList