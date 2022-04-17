import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { LoginButton } from './Login'
import { SignInBtn } from './SignUp'

export const NavBar = ({ children }) => {
    return (
            <nav className="navbar navbar-dark navbar-expand-md bg-dark ">
                <div className="container-fluid">
                    <NavBarBrand>iPoostok</NavBarBrand>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas bg-dark text-light offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header border-bottom">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">iPoostok</h5>
                            <button type="button" className="btn-close text-reset " style={{filter: 'invert(1)'}} data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body ">
                            <ul className="navbar-nav justify-content-start align-items-md-center flex-grow-1 pe-3">
                                {children}
                            </ul>
                            <SignInBtn/>
                            <LoginButton/>
                        </div>
                    </div>
                </div>
            </nav>

    )
}

export const NavBarBrand = ({ children }) => {
    return <Link className="navbar-brand fs-ms-madi" to="/">{children}</Link>
}
export const NavBarLink = ({ children, to }) => {
    return (
        <li data-bs-dismiss="offcanvas"  className="nav-item">
            <NavLink exact className="nav-link" activeClassName="active" aria-current="page" to={to}
            >{children}</NavLink>
        </li>
    )
}