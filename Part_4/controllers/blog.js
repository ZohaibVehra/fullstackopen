const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const savedBlog = await blog.save()
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