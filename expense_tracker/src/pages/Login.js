import { useState } from 'react'
import { Link, Navigate} from 'react-router-dom'
import { login } from '../actions/auth'

const Login = ({ dispatch, auth }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const {email, password} = formData

    const onFormChange = e => setFormData({
        ...formData, 
        [e.target.name]: e.target.value
    })

    const onFormSubmit = e => {
        e.preventDefault()
        login(email, password, dispatch, auth)
    }

    if (auth.IsAuthenticated) {
        return (
            <Navigate to="/" />
        )
    }

    return (
        <div className='container'>
            <h1>Sign in</h1>
            <p>Sign into your account </p>
            <form onSubmit={onFormSubmit}>
                <div className='form-group'>
                    <input
                        type='email'
                        value={email}
                        placeholder='Email'
                        name='email'
                        onChange={onFormChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        value={password}
                        placeholder='Password'
                        name='password'
                        onChange={onFormChange}
                        required
                        minLength='6'
                    />
                </div>
                <button type='submit'>Login</button>
            </form>
            <p>Don't have an account?
                <Link to="/signup">Sign Up</Link>
            </p>
            <p><Link to="/reset_password">Forgot Password?</Link></p>
        </div>
    )
}

export default Login