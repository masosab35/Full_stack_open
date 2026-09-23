import { useState, useEffect } from 'react'
import AllPerson from './components/allPerson'
import PersonForm from './components/personForm'
import Filter from './components/filter'
import Message from './components/message'
import agenda from './services/agenda'

const App = () => {
  const [persons, setPersons] = useState([
  
])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect( () => {
    console.log("working")
    agenda.getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response)
      })

  }, [])
  console.log('render', persons.length, 'persons')
  
  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (persons.filter(person => person.name === newName).length > 0){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        modifyPerson(persons.filter(person => person.name === newName)[0].id, {name: newName, number: newNumber})
        
        setNewName('')
        setNewNumber('')
        return
      }
      return
    }
    console.log(persons.content)
    const nameObject = {
      name: newName,
      number: newNumber
    }
    agenda.create(nameObject).then(response => {
      setPersons(persons.concat(response))
      setMessage(`Added "${newName}"`)
    })
    setNewName('')
    setNewNumber('')
  }
  const handleChangeInput = (event) => {
    setNewName(event.target.value)
  }
  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleChangeFilter = (event) => {
    setFilter(event.target.value)
  }
  const handleDelete = (id) => {
    agenda.remove(id).then(response => {
      setPersons(persons.filter(person => person.id !== id))
    })
  }
  const modifyPerson = (id, newObject) => {
    agenda.update(id, newObject).then(response => {
      setPersons(persons.map(p => p.id !== id ? p : response))
      setMessage({content :`Changed "${newName}" number to ${newNumber}`, type: 'success'})
    }).catch(error => {
      setMessage(`Information of "${newName}" has already been removed from server`)
      setPersons(persons.filter(person => person.id !== id))
    })
  }
  return (
    <div>
      <Message message={message} />
      <h2>Phonebook</h2>
      <Filter filter= {filter} handleChangeFilter={handleChangeFilter}></Filter>
      <PersonForm handleFormSubmit={handleFormSubmit} handleChangeInput={handleChangeInput} handleChangeNumber={handleChangeNumber} newName={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <AllPerson persons={persons} filter={filter} handleDelete={handleDelete}/>
      
    </div>
  )
}

export default App