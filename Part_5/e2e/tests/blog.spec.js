const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://127.0.0.1:3003/api/testing/reset')
    await request.post('http://127.0.0.1:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await page.goto('http://localhost:5174')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('wrongpassword')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      const testBlog = {
        title: 'Test Title',
        author: 'Test Author',
        url: 'http://testblog.com'
      }
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.locator('#title').fill(testBlog.title)
      await page.locator('#author').fill(testBlog.author)
      await page.locator('#url').fill(testBlog.url)
      await page.locator('#create').click()
      await expect(page.getByText(`a new blog ${testBlog.title} by ${testBlog.author} added`)).toBeVisible()
      await expect(page.getByText(`${testBlog.title} ${testBlog.author}`)).toBeVisible()
    })

    test('A blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.locator('#title').fill('Like test title')
      await page.locator('#author').fill('Like Author')
      await page.locator('#url').fill('http://likeblog.com')
      await page.locator('#create').click()
      await expect(page.getByText('Like test title by Like Author')).toBeVisible()
      await page.locator('#view-button').click()
      await page.locator('#like-button').click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('A blog can be deleted by the creator of the blog', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.locator('#title').fill('Delete test Title')
      await page.locator('#author').fill('Del Author')
      await page.locator('#url').fill('http://thirdblog.com')
      await page.locator('#create').click()
      await page.locator('#view-button').click()
      page.once('dialog', dialog => dialog.accept())
      await page.locator('#del-button').click()
      await expect(page.getByText('Delete test Title Del Author')).not.toBeVisible()
    })

    test('Only creator of the blog can see the remove button of the blog', async ({ page, request }) => {
      const firstBlog = { title: 'First Title v2', author: 'First Author Jr', url: 'http://firstblog2.com' }

      await page.getByRole('button', { name: 'new blog' }).click()
      await page.locator('#title').fill(firstBlog.title)
      await page.locator('#author').fill(firstBlog.author)
      await page.locator('#url').fill(firstBlog.url)
      await page.locator('#create').click()
      await expect(page.getByText(`${firstBlog.title} ${firstBlog.author}`)).toBeVisible()

      await page.locator('#view-button').click()
      await expect(page.locator('#del-button')).toBeVisible()

      const anotherUser = { name: 'Another Tester', username: 'another.tester@example.com', password: 'sekret2' }
      await request.post('http://127.0.0.1:3003/api/users', { data: anotherUser })

      await page.getByRole('button', { name: 'logout' }).click()
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByLabel('username').fill(anotherUser.username)
      await page.getByLabel('password').fill(anotherUser.password)
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText(`${firstBlog.title} ${firstBlog.author}`)).toBeVisible()
      await page.locator('#view-button').click()
      await expect(page.locator('#del-button')).toHaveCount(0)
    })

    test('Blogs are in descending order according to likes', async ({ page, request }) => {
      const loginRes = await request.post('http://127.0.0.1:3003/api/login', {
        data: { username: 'mluukkai', password: 'salainen' }
      })
      const { token } = await loginRes.json()

      const b1 = { title: 'Galaxy Guide', author: 'Ada Star', url: 'http://galaxy.example', likes: 3 }
      const b2 = { title: 'Aurora Notes', author: 'Ben North', url: 'http://aurora.example', likes: 2 }
      const b3 = { title: 'Comet Chronicles', author: 'Cara Sky', url: 'http://comet.example', likes: 4 }

      for (const b of [b1, b2, b3]) {
        await request.post('http://127.0.0.1:3003/api/blogs', {
          data: b,
          headers: { Authorization: `Bearer ${token}` }
        })
      }

      await page.reload()

      const items = page.locator('.blog')
      await expect(items.nth(0)).toContainText('Comet Chronicles Cara Sky')
      await expect(items.nth(1)).toContainText('Galaxy Guide Ada Star')
      await expect(items.nth(2)).toContainText('Aurora Notes Ben North')
    })
  })
})
