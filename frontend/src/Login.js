import {useState, useEffect} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"

function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    const savedUser = localStorage.getItem("username")
    if (savedUser) {
      setUsername(savedUser)
    }
  }, [])

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const response = await axios.post("/login", {
        username,
        password
      })

      if (response.status === 200) {
        localStorage.setItem("username", username)
        navigate("/welcome")
      }

    } catch (err) {
      setError("Invalid username or password")
    }
  }

  return (
    <div className="login-container">

      <form className="login-form" onSubmit={handleLogin}>

        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        {error && <p className="error">{error}</p>}

      </form>

    </div>
  )
}

export default Login