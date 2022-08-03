import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { checkAuthenticated, load_user } from '../actions/auth'

const Layout = ({ auth, dispatch, ...props }) => {
    useEffect(() => {
        checkAuthenticated(dispatch)
        load_user(dispatch)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <Navbar auth={auth} dispatch={dispatch} />
            {props.children}
        </div>
    )
}

export default Layout