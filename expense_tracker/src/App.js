import { useReducer } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Layout from './hocs/Layout'
import authReducer from './reducers/authReducer'

import Home from './pages/Home'
import Activate from './pages/Activate'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ResetPassword from './pages/ResetPassword'
import ResetPasswordConfirm from './pages/ResetPasswordConfirm'

import './static/style.css'


const App = () => {
  const [auth, dispatchAuth] = useReducer(authReducer, {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    IsAuthenticated: null,
    user: null
  })

  return (
        <Router>
            <Layout auth={auth} dispatch={dispatchAuth}>
                <Routes>
                    <Route path="/" element={ 
                        <Home dispatch={dispatchAuth} auth={auth} /> } />
                    <Route path="/login" element={ 
                        <Login dispatch={dispatchAuth} auth={auth} /> } />
                    <Route path="/signup" element={ 
                        <Signup dispatch={dispatchAuth} /> } />
                    <Route path="/reset_password" element={ 
                        <ResetPassword /> } />
                    <Route path="/password/reset/confirm/:uid/:token"element={
                        <ResetPasswordConfirm /> } />
                    <Route path="/activate/:uid/:token" element={ 
                        <Activate /> } />
                </Routes>
            </Layout>
        </Router> 
    )
}

export default App