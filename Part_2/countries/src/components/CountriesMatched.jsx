import { useEffect } from "react"

const CountryRender = ({ countryName, buttonFunc }) => {
    return (
        <p>{countryName} <button onClick={() => buttonFunc(countryName)}>show</button></p>
    );
};


const CountriesMatched = ({currentShown, currentCountry, allCountries, validateCountry, handleShow}) => {

    const matches = allCountries.filter(country => country.toLowerCase().includes(currentCountry.toLowerCase()));

    useEffect(() => {
        if(!matches.includes(currentShown) || matches.length > 10){       
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
            {matches.map( countryName => <CountryRender key={countryName} countryName={countryName} buttonFunc={handleShow} />)}
        </div>
    )
}


export default CountriesMatched