import { useEffect, useState } from 'react'
import countriesService from '../services/countries'

const LanguagesMapped = ({languages}) => {
    
    return(
        <ul>
            {languages.map(lang => <li key={lang}>{lang}</li>)}
        </ul>
    )
}

const CountryInfo = ({valid, country}) => {
    
    
    const [countryInfo, setCountryInfo] = useState(null)
    
    useEffect(() =>{
        if (!valid) {
            setCountryInfo('')
            return
        }

        countriesService.getCountry(country).then(countryInfo => setCountryInfo(countryInfo))
    }, [valid, country])


    if (!valid || !countryInfo) return <></>

    
    let {
        name: {common: countryName},
        area,
        flags: {png: flag},
        capital,
        languages
    } = countryInfo

    capital = capital.length > 0 ? capital[0] : ''
    languages = Object.values(languages)
    
    return(
        <div>
            <h1>{countryName}</h1>
            <p>Capital: {capital.length>0 ? capital : 'N/A'} <br/>Area: {area}</p>
            <h1>Languages</h1>
            {languages.length>0 ? <LanguagesMapped languages={languages}/>: <p>No Languages Found</p>}
            <img src = {flag} />
        </div>
    )
}

export default CountryInfo