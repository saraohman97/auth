import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false)
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()

        if(user.name === '' || user.email === '' || user.password === '' || user.password2 === '') {
            setError(true)
        }
        else {
            console.log(user)
            setUser({
                name: '',
                email: '',
                password: '',
                password2: ''
            })
            navigate('/login')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Registration</h1>

            <div className="input-group">
                <label htmlFor="name">Name</label>
                <input type="text" name='name' value={user['name']} onChange={handleChange} />
                <span style={{color: 'red'}} className={error === true ? 'error' : 'success'}>{user.name === '' ? 'Field can\'t be empty' : '' || user.name.length < 2 ? 'Name must contain atleast 2 char' : ''}</span>
            </div>

            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="email" name='email' value={user['email']} onChange={handleChange} />
                <span style={{color: 'red'}} className={error === true ? 'error' : 'success'}>{user.email === '' ? 'Field can\'t be empty' : ''}</span>
            </div>

            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" name='password' value={user['password']} onChange={handleChange} />
                <span style={{color: 'red'}} className={error === true ? 'error' : 'success'}>{user.password === '' ? 'Field can\'t be empty' : '' || user.password.length < 2 ? 'Password must contain atleast 2 char' : ''}</span>
            </div>

            <div className="input-group">
                <label htmlFor="password2">Repeat password</label>
                <input type="password" name='password2' value={user['password2']} onChange={handleChange} />
                <span style={{color: 'red'}} className={error === true ? 'error' : 'success'}>{user.password2 === '' ? 'Field can\'t be empty' : ''}</span>
            </div>

            <button type='submit'>Register</button>
            <p>Already a member? <Link to='/login'>Login</Link>.</p>
        </form>
    )
}

export default Register