const mongoose  = require('mongoose')
const { test, after, beforeEach, describe } = require('node:test')
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

test('verify post to /api/blogs creates new blog with likes = 0 if not specified', async () => {
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

  assert.strictEqual(createdBlog.body.likes, 0)
})

test('verify post to /api/blogs returns 400 if no title given', async () => {
  const newBlog = {
    author: 'fake name',
    url: 'http://example.com/random'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

})

test('verify post to /api/blogs returns 400 if no url given', async () => {
  const newBlog = {
    author: 'fake name',
    title: 'fake title'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

})

test('deleting a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const idToDelete = blogsAtStart[0].id

  await api
    .delete(`/api/blogs/${idToDelete}`)
    .expect(204)

  const blogsInDb = await helper.blogsInDb()
  const ids = blogsInDb.map(blog => blog.id)
  assert(!ids.includes(idToDelete))
  assert.strictEqual(blogsInDb.length, helper.initialBlogs.length-1)
})

test('updating a blogs properties works', async () => {
  //note while 4.14 specifies it mostly needs to update likes,
  //this test will test updating all properties
  const blogs = await helper.blogsInDb()
  const blogToEdit = blogs[0]
  blogToEdit.author = 'edited author'
  blogToEdit.url = 'edited url'
  blogToEdit.title = 'edited title'
  blogToEdit.likes = 999

  const updatedBlogObj = await api
    .put(`/api/blogs/${blogToEdit.id}`)
    .send(blogToEdit)
    .expect(200)

  const updatedBlog = updatedBlogObj.body

  assert.strictEqual(updatedBlog.title, 'edited title')
  assert.strictEqual(updatedBlog.author, 'edited author')
  assert.strictEqual(updatedBlog.url, 'edited url')
  assert.strictEqual(updatedBlog.likes, 999)
})

describe('User related tests', () => {
  test('User generation with a username shorter than 3 characters fails and returns correct error', async () => {
    const newUser = {
      username: 'ab',
      password: 'testpassword'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    assert.ok(result.body.error.includes('shorter than the minimum allowed length'))
  })

  test('User generation with a password shorter than 3 characters fails and returns correct error', async () => {
    const newUser = {
      username: 'testusername',
      password: 'ab'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    assert.strictEqual(result.body.error, 'password must be at least 3 characters')
  })
})

after(async () => {
  await mongoose.connection.close()
})
