import axios from "axios";
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const getAll = () => axios.get(baseUrl+'/all').then(response => response.data)

const getCountry = (country) => axios.get(baseUrl+'/name/'+country).then(response => response.data).catch(er => console.log(err))


export default {getAll, getCountry}