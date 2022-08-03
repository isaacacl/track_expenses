
const authReducer = (state, action) => {
    const { type, payload } = action
    switch(type) {
        case 'LOGIN_SUCCESS':
            localStorage.setItem('access', payload.access)
            return {
                ...state,
                IsAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case 'USER_LOADED_SUCCESS':
            return {
                ...state,
                user: payload
            }
        case 'USER_LOADED_FAIL':
            return {
                ...state,
                user: null
            }
        case 'AUTHENTICATION_SUCCESS':
            return {
                ...state,
                IsAuthenticated: true
            }
        case 'ACCOUNT_CREATION_SUCCESS':
        case 'AUTHENTICATION_FAIL':
            return {
                ...state,
                IsAuthenticated: false
            }
        case 'ACCOUNT_CREATION_FAIL':
        case 'LOGIN_FAIL':
        case 'LOGOUT':
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return {
                ...state,
                access: null,
                refresh: null,
                IsAuthenticated: false,
                user: null
            }
        default:
            console.log(type)
            return state 
    }
}

export default authReducer