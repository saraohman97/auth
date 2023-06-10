import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'


const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { dispatch } = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({type: "LOGIN", payload: user})
        navigate('/')
      })
      .catch((error) => {
        setError(true)

      });
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>

      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </div>

      <button>Login</button>
      {error && <p style={{ color: 'red' }}>Wrong email or password</p>}
      <p>Not a member? <Link to='/register'>Register</Link>.</p>
    </form>
  )
}

export default Login