import React from 'react'
import { AuthContext } from '../context/Auth'
import '../../stylesheet/modal.css'
import Icons from '../assets/svg/Facebook.svg'


export const SignUp = () => {
    const { authToken } = React.useContext(AuthContext)
    console.log(authToken)
    const onSubmit = e => {
        e.preventDefault()
    }
    return (
        !authToken &&
        <div className="modal rounded-5 shadow fade" id="modalSignin" tabIndex="-1" aria-labelledby="modalSigninTitle" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header p-5 pb-4 border-bottom-0">
                        <h2 className="fw-bold mb-0" id="modalSigninTitle">Sign up for free</h2>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body p-5 pt-0">
                        <form className="" onSubmit={onSubmit} >
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control rounded-4" id="floatingInput" placeholder="name@example.com" />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control rounded-4" id="floatingPassword" placeholder="Password" />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                            <button className="w-100 mb-2 btn btn-lg rounded-4 btn-primary" type="submit">Sign up</button>
                            <small className="text-muted">By clicking Sign up, you agree to the terms of use.</small>
                            <hr className="my-4" />
                            <h2 className="fs-5 fw-bold mb-3">Or use a third-party</h2>
                            <button className="w-100 py-2 mb-2 btn btn-outline-dark rounded-4" type="submit">
                                <svg className="bi me-1" width="16" height="16"><use xlinkHref={`${Icons}#twitter`} /></svg>
                                Sign up with Twitter
                            </button>
                            <button className="w-100 py-2 mb-2 btn btn-outline-primary rounded-4" type="submit">
                                <svg className="bi me-1" width="16" height="16"><use xlinkHref={`${Icons}#facebook`} /></svg>
                                Sign up with Facebook
                            </button>
                            <button className="w-100 py-2 mb-2 btn btn-outline-secondary rounded-4" type="submit">
                                <svg className="bi me-1" width="16" height="16"><use xlinkHref={`${Icons}#github`} /></svg>
                                Sign up with GitHub
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const SignInBtn = () => {
    const { authToken } = React.useContext(AuthContext)
    return (
        !authToken ?
            <button type="button" className="btn btn-primary mx-2 my-1" data-bs-toggle="modal" data-bs-target="#modalSignin">
                Sign Up
            </button>
            : null
    )
}