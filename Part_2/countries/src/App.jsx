import { useEffect, useState } from 'react'
import countriesService from './services/countries'
import Form from './components/Form'
import CountriesMatched from './components/CountriesMatched'
import CountryInfo from './components/CountryInfo'


function App() {

  const [allCountries, setAllCountries] = useState([])  
  const [currentCountry, setCurrentCountry] = useState('')
  const [validatedCountry, setValidatedCountry] = useState('')
 

  //handle user typing into input for country name
  const handleChange = event => setCurrentCountry(event.target.value) 
  const validateCountry = countryName =>  setValidatedCountry(countryName)

  //handles show button click
  const handleShow = countryName => setValidatedCountry(countryName)

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
      <CountriesMatched handleShow={handleShow} currentCountry={currentCountry}  allCountries={allCountries} validateCountry={validateCountry} currentShown={validatedCountry} />

      <CountryInfo  country={validatedCountry}/>
      
    </>
  )
}

export default App
