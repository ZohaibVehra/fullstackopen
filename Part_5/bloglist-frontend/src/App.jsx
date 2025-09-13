import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import BlogDisplay from './components/BlogDisplay'
import LoginForm from './components/LoginForm'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    }catch{
      console.log('bad credentials');
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <>
      {(!user && <LoginForm {...{username, password, setUsername, setPassword, handleLogin}} />)}
      {(user && <BlogDisplay blogs={blogs} username={user.name}/>)}
    </>
  )
}

export default App