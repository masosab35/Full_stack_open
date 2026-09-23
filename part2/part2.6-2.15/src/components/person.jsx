import agenda from '../services/agenda'
const Person = ({name, number, handleDelete, id}) => {
  return (
    <>
    <p className='person'>
      {name} {number}
    </p>
    <button onClick={() => window.confirm('Are you sure you want to delete this person?')? handleDelete(id):null}>Delete</button>
    </>
  )
}

export default Person