import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, delBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const toggleVisibility = () => setVisible(!visible)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const performLike = ()=> {
    blogService.addLike(blog)
    setLikes(likes+1)
  } 
  
  
  return (
    <div>
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
        <div style={showWhenVisible}>
          <div>{blog.url}</div>
          <div>likes {likes} <button onClick={performLike}>like</button></div>
          <div>{blog.user.username}</div>
          <div>
            {( (user.username === blog.user.username) && <button onClick={()=> delBlog(blog)}>remove</button>)}
          </div>
      </div>
      </div>
    </div>

  )
}

export default Blog
