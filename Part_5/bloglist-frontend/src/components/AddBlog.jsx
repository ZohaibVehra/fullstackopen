import { useState } from "react"



const AddBlog = ({createBlog}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addNewBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    createBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
      <div>
      <label>
        title:
        <input value={title} onChange={ ({target})  => setTitle(target.value)} />
      </label>
      </div>
      <div>
      <label>
        author:
        <input value={author} onChange={ ({target})  => setAuthor(target.value)} />
      </label>
      </div>
      <div>
      <label>
        url:
        <input value={url} onChange={ ({target})  => setUrl(target.value)} />
      </label>
      </div>
      <button type="submit" onClick={addNewBlog}>create</button>
    </div>
  )
}

export default AddBlog

