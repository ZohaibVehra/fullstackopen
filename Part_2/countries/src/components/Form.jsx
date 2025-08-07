const Form = ({currentCountry, handleChange}) => {
    return(
        <>
            find countries<input onChange={handleChange} value={currentCountry} placeholder='enter a country'></input>
        </>
    )
}

export default Form