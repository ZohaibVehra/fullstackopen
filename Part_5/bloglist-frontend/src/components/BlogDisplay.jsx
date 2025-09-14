import Blog from '../components/Blog'

const BlogDisplay = ({blogs}) => {

  console.log(blogs);
  
  blogs.sort((a, b) => b.likes - a.likes)

    return (
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )  
}

export default BlogDisplay
