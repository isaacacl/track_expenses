import axios from "axios"


export const checkAuthenticated = dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const body = JSON.stringify({
            token: localStorage.getItem('access')
        })
        axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, 
            body, config)
        .then(response => {
            if (response.data.code !== "token_not_valid") {
                dispatch({ type: 'AUTHENTICATION_SUCCESS'})
            } else {
                dispatch({ type: 'AUTHENTICATION_FAIL'})
            }
        })
        .catch(() => {
            dispatch({ type: 'AUTHENTICATION_FAIL'})
        })
        
    } else {
        dispatch({ type: 'AUTHENTICATION_FAIL'})
    }
}

export const load_user = dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        }
        axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config)
        .then(response => {
            dispatch({
                type: 'USER_LOADED_SUCCESS',
                payload: response.data
            })
        })
        .catch(() => {
            dispatch({ type: 'USER_LOADED_FAIL' })
        })
    } else {
        dispatch({
            type: 'USER_LOADED_FAIL'
        })
    }
}

export const login = (email, password, dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const data = JSON.stringify({ email, password })

    axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, 
        data, config)
    .then(response => {
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: response.data
        })
    })
    .catch(error => {
        console.log(error)
        dispatch({
            type: 'LOGIN_FAIL'
        })
    })
}  

export function reset_password(email) {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email })
    axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`,
        body, config)
        .catch(error => console.log(error))
}

export const reset_password_confirm =   (uid, token, 
                                        new_password,re_new_password) => {
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ uid, token, new_password, re_new_password })
    axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`,
        body, config)
        .catch(err => console.log(err))
}

export const logout = dispatch => {
    dispatch({type: 'LOGOUT'})
}

export const activate = (uid, token, setActivated, activated) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ uid, token })
    setActivated({...activated, loading: true })
    axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`,
        body, config)
    .then(() => {
        setActivated({
            redirecting: true, 
            flag: true,
            loading: false,
            error: false
        })
    })
    .catch(error => {
        console.log(error)
        setActivated({
            redirecting: false,
            flag: false,
            loading: false,
            error: true
        })
    })
}

export const register = (email, name, password, re_password) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const data = JSON.stringify({ email, name, password, re_password })
    
    axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`,
        data, config)
    .catch(error => console.log(error))
}