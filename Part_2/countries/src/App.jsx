import { useEffect, useState } from 'react'
import countriesService from './services/countries'
import Form from './components/Form'
import CountriesMatched from './components/CountriesMatched'
import CountryInfo from './components/CountryInfo'


function App() {

  const [allCountries, setAllCountries] = useState([])  
  const [currentCountry, setCurrentCountry] = useState('')
  const [validCountry, setValidCountry] = useState(false)
  const [validatedCountry, setValidatedCountry] = useState('')
 

  //handle user typing into input for country name
  const handleChange = event => setCurrentCountry(event.target.value) 
  const valid = (input) => input ? setValidCountry(true) : setValidCountry(false)
  const validateCountry = countryName =>  setValidatedCountry(countryName)
  //gets all countries, runs once after render
  useEffect(() => {countriesService.getAll().then(
    data => {
      const names = data.map(country => country.name.common)
      setAllCountries(names)
    }
  )} , [])

  
  
  
  
  return (
    <>
      <Form currentCountry={currentCountry} handleChange={handleChange}/>
      <CountriesMatched currentCountry={currentCountry}  allCountries={allCountries} valid={valid} validateCountry={validateCountry} />

      <CountryInfo valid={validCountry} country={validatedCountry}/>
      
    </>
  )
}

export default App
