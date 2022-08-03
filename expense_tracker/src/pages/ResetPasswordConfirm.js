import React, { useState } from 'react'
import { reset_password_confirm } from '../actions/auth'
import { useParams, Navigate } from 'react-router-dom'

const ResetPasswordConfirm = () => {
    const [sentRequest, setSentRequest] = useState(false)
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    })

    const { uid, token } = useParams()

    const { new_password, re_new_password } = formData

    const handleFormChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })

    const handleFormSubmit = e => {
        e.preventDefault()
        reset_password_confirm(uid, token, new_password, re_new_password)
        setSentRequest(true)
        
    }

    if (sentRequest) {
        return <Navigate to="/" />
    }

    return (
        <div className='container'>
            <h1>Enter New Password</h1>
            <form onSubmit={e => handleFormSubmit(e)}>
                <div className='form-group'>
                    <input 
                        type='password'
                        name='new_password'
                        placeholder='New Password'
                        onChange={e => handleFormChange(e)}
                        value={new_password}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input 
                        type='password'
                        name='re_new_password'
                        placeholder='Repeat New Password'
                        onChange={e => handleFormChange(e)}
                        value={re_new_password}
                        required
                    />
                </div>
                <button type='submit'>Reset</button>
            </form>
        </div>
    )
}

export default ResetPasswordConfirm