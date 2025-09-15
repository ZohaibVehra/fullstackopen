import { render, screen } from '@testing-library/react'
import AddBlog from './AddBlog'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> calls the event handler with right details', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<AddBlog createBlog={createBlog} />)

  const inputTitle = screen.getByPlaceholderText('title')
  const inputAuthor = screen.getByPlaceholderText('author')
  const inputUrl = screen.getByPlaceholderText('url')

  const sendButton = screen.getByText('create')

  await user.type(inputTitle, 'abcs of math')
  await user.type(inputAuthor, 'bobross')
  await user.type(inputUrl, 'url.com')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  console.log(createBlog.mock.calls)

  expect(createBlog.mock.calls[0][0].title).toBe('abcs of math')
  expect(createBlog.mock.calls[0][0].author).toBe('bobross')
  expect(createBlog.mock.calls[0][0].url).toBe('url.com')
})