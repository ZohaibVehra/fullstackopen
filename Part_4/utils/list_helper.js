const dummy = (blogs) => {
  if(blogs) console.log('')//without this line eslint gives errors
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer,0)
}

const favoriteBlog  = (blogs) => {
  if(blogs.length === 0) return null
  return blogs.reduce( (bestBlog, blog) => blog.likes > bestBlog.likes ? blog : bestBlog )
}

const mostBlogs = (blogs) => {

  if(blogs.length === 0) return {author: null, blogs: 0}

  const authorMap = new Map()

  for(const blog of blogs) {
    if(authorMap.has(blog.author)){
       authorMap.set(blog.author, authorMap.get(blog.author) + 1)
    }
    else authorMap.set(blog.author, 1)
  }

  retAuthor = null
  retBlogs = 0

  for (const [key, value] of authorMap){
    if(value > retBlogs){
      retAuthor = key
      retBlogs = value
    }
  }

  return {author: retAuthor, blogs: retBlogs}

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}