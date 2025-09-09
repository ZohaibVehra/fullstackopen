const mongoose  = require('mongoose')
const { test, after, beforeEach } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const helper = require('./apitest_helper')

const api = supertest(app)

test('blogs are returned as json and correct amount of blogs returned', async () => {
  const blogs = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  assert.strictEqual(blogs.body.length, helper.initialBlogs.length )
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('verify unique identifier property is named id', async () => {
  const blogs = await helper.blogsInDb()

  blogs.forEach(blog => {
    assert.ok(blog.id) //confirms blog id property exists
    assert.strictEqual(blog._id, undefined) //confirms blog id dne
  })
})

test('verify post to /api/blogs creates new blog', async () => {
  const newBlog = {
    title: 'test addition',
    author: 'fake name',
    url: 'http://example.com/random',
    likes: 13
  }

  const createdBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsInDb = await helper.blogsInDb()
  assert.strictEqual(blogsInDb.length, helper.initialBlogs.length + 1)
  assert.strictEqual(createdBlog.body.title, 'test addition')
})

test.only('verify post to /api/blogs creates new blog with likes = 0 if not specified', async () => {
  const newBlog = {
    title: 'test addition',
    author: 'fake name',
    url: 'http://example.com/random'
  }

  const createdBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  console.log(createdBlog.body)
  assert.strictEqual(createdBlog.body.likes, 0)
})

after(async () => {
  await mongoose.connection.close()
})
