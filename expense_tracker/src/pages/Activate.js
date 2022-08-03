import { useEffect, useState} from 'react'
import { activate } from '../actions/auth'
import { useParams, Link, useNavigate} from 'react-router-dom'

const Activate = () => {
    const navigate = useNavigate()
    const { uid, token } = useParams()
    const [activated, setActivated] = useState({
        flag: false, loading: false, error: false, redirecting: false
    })
    const { flag, loading, error, redirecting } = activated

    useEffect(() => {
        activate(uid, token, setActivated, activated)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (redirecting) {
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [redirecting])


    return (
        <div className='container'>
            <h1>Account Activation</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Something went wrong, account not activated</p>}
            {flag && 
                <p>Your account has been activated, you may now
                    <Link to="/login"> Login</Link></p>
            } 
            {redirecting && <p>Redirecting...</p>}
            
        </div>
    )
    
}

export default Activate