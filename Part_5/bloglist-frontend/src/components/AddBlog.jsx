const AddBlog = ({title, author, url, setTitle, setAuthor, setUrl, createBlog}) => {
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
      <button type="submit" onClick={createBlog}>create</button>
    </div>
  )
}

export default AddBlog

