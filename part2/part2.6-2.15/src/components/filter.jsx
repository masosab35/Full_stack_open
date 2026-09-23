const Filter = ({filter, handleChangeFilter}) => {
    return(
        <input value= {filter} onChange={handleChangeFilter}></input>
    )
}
export default Filter