import React from 'react'
import { NavLink } from 'react-router-dom'
import { LoginButton } from './Login'
import { SignInBtn } from './SignUp'

export const NavBar = ({ children }) => {
    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavBarBrand>iPoostok</NavBarBrand>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            {children}
                        </ul>
                        {/* right aligned buttons are here */}
                        <SignInBtn/>
                        <LoginButton/>
                    </div>
                </div>
            </nav>
        </header>

    )
}

export const NavBarBrand = ({ children }) => {
    return <a className="navbar-brand" href="/">{children}</a>
}
export const NavBarLink = ({ children, to }) => {
    return (
        <li className="nav-item">
            <NavLink exact className="nav-link" activeClassName="active" aria-current="page" to={to}>{children}</NavLink>
        </li>
    )
}