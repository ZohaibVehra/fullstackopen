import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'


test('blog renders title and author but not url or likes', async () => {
  const blog = {
    title: 'abcs of math',
    author: 'bobross',
    url: 'url.com',
    likes: 13,
    user: {
      username: 'test user username'
    }
  }
  const user = {
    username: 'test username',
    id: 'test id',
    name: 'test name'
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} delblog={mockHandler} user={user}/>)
  screen.debug()
  expect(screen.getByText('bobross', { exact: false })).toBeVisible()
  expect(screen.getByText('abcs of math', { exact: false })).toBeVisible()
  expect(screen.getByText('likes 13')).not.toBeVisible()
  expect(screen.getByText('url.com')).not.toBeVisible()

})


test('clicking view button shows url and likes', async () => {
  const blog = {
    title: 'abcs of math',
    author: 'bobross',
    url: 'url.com',
    likes: 13,
    user: {
      username: 'test user username'
    }
  }
  const userForBlog = {
    username: 'test username',
    id: 'test id',
    name: 'test name'
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} delblog={mockHandler} user={userForBlog}/>)
  screen.debug()

  const button = screen.getByText('view')
  const user = userEvent.setup()
  await user.click(button)
  expect(screen.getByText('likes 13')).toBeVisible()
  expect(screen.getByText('url.com')).toBeVisible()

})