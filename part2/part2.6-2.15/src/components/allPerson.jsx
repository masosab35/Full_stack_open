import Person from './person'

const AllPerson = ({ persons, filter, handleDelete }) => {
  console.log(persons, filter)
  return (
    <div>
        {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => <Person key={person.id} id={person.id} handleDelete={handleDelete} name={person.name} number={person.number} />)}
    </div>
    
  )
}

export default AllPerson