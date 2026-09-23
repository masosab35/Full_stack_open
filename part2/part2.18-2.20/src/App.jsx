import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

function App() {
  const [country, setCountry] = useState(null)
  const [countriesList, setCountriesList] = useState([])
  const [weatherData, setWeatherData] = useState()
 
  useEffect(() =>{
    if (!countriesList[0]){
      return 
    }
    let country= countriesList[0]
    let capitalWeather = axios.get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${country.capital[0]}&aqi=no`).then(response => 
      {setWeatherData(response.data)})
    
      
  },[countriesList])

  
  const handleChange = (event) => {
    event.preventDefault()
    setCountry(event.target.value)
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountriesList(response.data.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
        
      })
    
    
  }
  const handleShowButton = (cca2) => {
    let selectedCountry= Object.values(countriesList).find(country => country.cca2 == cca2)
    console.log(selectedCountry)
    setCountriesList([selectedCountry])
  }
  const singleCountry = (country) => {
      console.log(Object.values(country.languages))
      return (
        <>
          <h1>{country.name.common}</h1>
          <p key= 'capital'>Capital: {country.capital[0]}</p>
          <p key= 'area'>Area: {country.area}</p>

          <h2>Languages</h2>
          <ul>
             {Object.values(country.languages).map(l => <li key={l}>{l}</li>)}
          </ul>
          <img key={country.flags.png}   src={country.flags.png} alt="Foto de bandera" />
          <p key='temp'>Temperature :{weatherData ? weatherData.current.temp_c: "Loading..."} Celsius</p>
          <p key='condition'>Condition : {weatherData ? weatherData.current.condition.text: "Loading..."}</p>
          <img key='weatherDataImage' src={weatherData ? weatherData.current.condition.icon: "Loading..."}></img>
         
        </>
      )
  }
  const renderCountries = () => {
    console.log(countriesList)
    if (countriesList.length == 1){
      return singleCountry(countriesList[0])
    }
    else if (countriesList.length < 11){
      return countriesList.map(p => 
        <div key={p.name.common}>
        <p >{p.name.common}</p> 
        <button onClick={() => handleShowButton(p.cca2,countriesList)}>Show</button>
        </div>
      )
    }
    else{
      return "Too many matches, specify another filter"
    }
    

  }
  return (
    <>
      <form>
        <label htmlFor="name">Find countries:</label>
        <input type="text" id="name" onChange={handleChange }/>
      </form>
      {
        renderCountries()
        
        }
      
    </>
  )
}

export default App
