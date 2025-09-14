import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import BlogDisplay from './components/BlogDisplay'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const loginFormRef = useRef()

  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (loginObject) => {
    try{
      const user = await loginService.login(loginObject)
      loginFormRef.current.toggleVisibility()
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    }catch{
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }
  }
  
  const createBlog = async (blogObject) => {
    
    try{
      const createdBlog = await blogService.create(blogObject)
      console.log(createdBlog);
      
      setMessage(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000);
      console.log('zzz');
      
      setBlogs(blogs.concat(createdBlog))
    }catch{
      setMessage('error when creating new blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }

  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const loginForm = () => (
    <Togglable buttonLabel='login' ref={loginFormRef}>
      <LoginForm loginUser={handleLogin}/>
    </Togglable>
  )

  const addBlogForm = () => (
    <Togglable buttonLabel='create new blog' ref={loginFormRef}>
      <h1>create new</h1>
      <AddBlog createBlog={createBlog} />
    </Togglable>
  )

  const removeBlog = async (blog) => {
  if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    } catch (error) {
      console.error('Error deleting blog:', error)
    }
  }
}



  return (
    <>
      <h1>Blog App</h1>
      <Notification message={message} />
      {(!user && loginForm())}
      {user && (
      <div>
        <span>{user.username} logged in </span>
        <button type="button" onClick={() => {
          window.localStorage.removeItem('loggedUser')
          setUser(null)
          blogService.setToken(null)
        }}>logout</button>
        </div>
      )}
      <br></br>
      {(user && addBlogForm())}
      {(user && <BlogDisplay delBlog={removeBlog} blogs={blogs} user={user}/>)}
      
    </>
  )
}

export default App