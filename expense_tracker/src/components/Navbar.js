import React from "react";
import { Link } from "react-router-dom"
import { logout } from "../actions/auth";


const Navbar = ({ auth, dispatch }) => {
    const guestLinks = () => (
        <>
            <span className='nav-button'>
                <Link to="/login">Login</Link>
            </span>
            <span className='nav-button'>
                <Link to="/signup">Signup</Link>
            </span>
        </>
    )

    const authLinks = () => (
        <span className='nav-button'>
            <a href='#!' onClick={() => logout(dispatch)}>Logout</a>
        </span>
    )

    return (
        <div id="navBar">
            <span className='nav-button'>
                <Link to="/">Home</Link>
            </span>
            {auth.IsAuthenticated ? authLinks() : guestLinks()}
        </div>
    )
}

export default Navbar