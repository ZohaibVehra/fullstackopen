const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { title, url, likes } = request.body

  const blog = new Blog({
    title,
    url,
    likes,
    user: '68c2e4dc77c86e542a31d749'
  })

  const user = await User.findById('68c2e4dc77c86e542a31d749')
  if(!user) return response.status(400).json({ error: 'userId missing or not vlaid' })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {

  const blog = await Blog.findById(request.params.id)

  if(!blog) return response.status(404).end()

  const { title, author, likes, url } = request.body

  blog.title = title
  blog.author = author
  blog.likes = likes
  blog.url = url

  const updatedBlog = await blog.save()
  return response.json(updatedBlog)

})

module.exports = blogsRouter