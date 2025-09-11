const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})


blogsRouter.post('/', userExtractor, async (request, response) => {
  const { title, url, likes } = request.body

  const user = request.user

  const blog = new Blog({
    title,
    url,
    likes,
    user: user._id
  })

  if(!user) return response.status(400).json({ error: 'userId missing or not vlaid' })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user

  if (!user._id) return response.status(401).json({ error: 'token invalid' })

  const blogToDelete = await Blog.findById(request.params.id)

  if(user._id.toString() !== blogToDelete.user.toString()){
    return response.status(403).send({ error: 'blogs may only be deleted by user who owns blog' })
  }

  await blogToDelete.deleteOne()
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