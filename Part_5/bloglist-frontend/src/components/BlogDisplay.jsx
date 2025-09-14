import Blog from '../components/Blog'

const BlogDisplay = ({ blogs, delBlog, user }) => {

  console.log(blogs)

  blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} delBlog={delBlog} user={user} />
      )}
    </div>
  )
}

export default BlogDisplay
