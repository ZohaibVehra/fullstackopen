import { useEffect } from "react"


const CountriesMatched = ({currentCountry, allCountries, valid, validateCountry}) => {

    const matches = allCountries.filter(country => country.toLowerCase().includes(currentCountry.toLowerCase()));

    useEffect(() => {
        if (matches.length === 1 && currentCountry.toLowerCase()=== matches[0].toLowerCase()) {
        valid(true)
        validateCountry(currentCountry)
        } else {
        valid(false)
        validateCountry('')
        }
    }, [matches])

    if(currentCountry === ''){
        return
    }
    
    if(matches.length > 10){
        return (
        <p>Too many matches, specify another filter</p>)
    }

    return(
        <div>
            {matches.map( countryName => <p key={countryName}>{countryName}</p>)}
        </div>
    )
}


export default CountriesMatched