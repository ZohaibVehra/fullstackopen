import { useState } from 'react'

const LoginForm = ({ loginUser }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = event => {
    event.preventDefault()
    loginUser({ username, password })
    setUsername('')
    setPassword('')
  }
  return(
    <div>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input type="text" value={username} onChange={ ({ target })  => setUsername(target.value) } />
          </label>
        </div>
        <div>
          <label>
          password
            <input type="text" value={password} onChange={ ({ target })  => setPassword(target.value) } />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm