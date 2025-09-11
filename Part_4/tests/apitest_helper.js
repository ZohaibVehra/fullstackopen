const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
  {
    username: 'user1',
    password: 'pass1',
    name: 'firstname'
  },
  {
    username: 'user2',
    password: 'pass2',
    name: 'secondname'
  }
]
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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = { initialBlogs, blogsInDb, initialUsers, usersInDb }
