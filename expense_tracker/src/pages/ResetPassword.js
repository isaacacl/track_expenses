import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { reset_password } from '../actions/auth'

const ResetPassword = () => {
    const [sentRequest, setSentRequest] = useState(false)
    const [emailInput, setEmailInput] = useState('')


    const handleFormChange = e => {
        setEmailInput(e.target.value)
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        reset_password(emailInput)
        setSentRequest(true)
    }

    if (sentRequest) {
        return <Navigate to="/" />
    }

    return (
        <div className='container'>
            <h1>Reset Password</h1>
            <p>Send an email to reset password</p>
            <form onSubmit={e => handleFormSubmit(e)}>
                <div className='form-group'>
                    <input 
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={emailInput}
                        onChange={e => handleFormChange(e)}
                        required
                    />
                </div>
                <button type='submit'>Send</button>
            </form>
        </div>
    )
}

export default ResetPassword