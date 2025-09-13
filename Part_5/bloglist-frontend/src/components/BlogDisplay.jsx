import Blog from '../components/Blog'

const BlogDisplay = ({blogs, username}) => {

    return (
      <div>
        <h2>blogs</h2>
        <p>{username}</p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )  
}

export default BlogDisplay
