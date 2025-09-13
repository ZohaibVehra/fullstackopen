import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import BlogDisplay from './components/BlogDisplay'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import AddBlog from './components/AddBlog'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch{
      console.log('bad credentials');
    }
  }
  
  const createBlog = async () => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    try{
      await blogService.create(blogObject)
      setTitle('')
      setAuthor('')
      setUrl('')
    }catch{
      console.log('err on create');
      
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
      {(user && <AddBlog {...{title, author, url, setTitle, setAuthor, setUrl, createBlog}} />)}
      {user && (
      <button type="button" onClick={() => {
          window.localStorage.removeItem('loggedUser')
          setUser(null)
          blogService.setToken('')
        }}>logout</button>)}
    </>
  )
}

export default App