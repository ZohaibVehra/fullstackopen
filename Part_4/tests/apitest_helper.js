const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Understanding Async/Await in JavaScript',
    author: 'Jane Doe',
    url: 'http://example.com/async-await',
    likes: 5,
  },
  {
    title: 'Node.js Best Practices',
    author: 'John Smith',
    url: 'http://example.com/node-best-practices',
    likes: 8,
  },
  {
    title: 'A Guide to MongoDB Aggregations',
    author: 'Alice Johnson',
    url: 'http://example.com/mongodb-aggregations',
    likes: 12,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}


module.exports = { initialBlogs, blogsInDb }
