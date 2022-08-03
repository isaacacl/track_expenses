import React, { useState } from 'react'
import { register } from '../actions/auth'
import { Link } from 'react-router-dom'

const Signup = () => {
    const [sentRequest, setSentRequest] = useState(false)

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        re_password: ''
    })

    const { email, name, password, re_password } = formData

    const onFormChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }

    const onSignup = e => {
        e.preventDefault()
        if (password === re_password) {
            register(email, name, password, re_password)
            setSentRequest(true)
        } else {
            console.log('passwords didnt match')
        }
    }

    return (
        <div className='container'>
            <h1>Sign Up</h1>
            <p>Enter a name, email, and password</p>
            <form onSubmit={onSignup}>
                <div className='form-group'>
                    <input 
                        type='text'
                        placeholder='Name*'
                        name='name'
                        onChange={e => onFormChange(e)}
                        value={formData.name}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input 
                        type='email'
                        placeholder='Email*'
                        name='email'
                        onChange={e => onFormChange(e)}
                        value={formData.email}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input 
                        type='password'
                        placeholder='Password*'
                        name='password'
                        onChange={e => onFormChange(e)}
                        value={formData.password}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input 
                        type='password'
                        placeholder='Confirm Password*'
                        name='re_password'
                        onChange={e => onFormChange(e)}
                        value={formData.re_password}
                        required
                    />
                </div>
                <button type='submit'>Sign Up</button>
            </form>
            <p>Already have an account? <Link to="/login">Sign In</Link></p>
            {sentRequest && 
                <p>Check your email for an activation link</p>
            }
        </div>
    )
}

export default Signup