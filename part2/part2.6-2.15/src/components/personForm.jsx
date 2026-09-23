
const PersonForm = ({handleFormSubmit, handleChangeInput, handleChangeNumber, newName, newNumber}) => {
    return(
        <>
        <form onSubmit={(e) => handleFormSubmit(e)}>
        <div>
          name: <input onChange={(e) => handleChangeInput(e)} value={newName}/>
        </div>
        <div>
          number: <input onChange={(e) => handleChangeNumber(e)} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
        </>
    )
}
export default PersonForm