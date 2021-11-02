import { useContext, useState } from 'react'
import { AuthContext } from '../context/Auth'
import '../../stylesheet/modal.css'
import Icons from '../assets/svg/Facebook.svg'


export const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { authToken, setAuthToken } = useContext(AuthContext)
    // console.log(authToken)
    const onSubmit = e => {
        e.preventDefault()
        fetchData(name,email, password)
        setEmail('')
        setPassword('')
        setName('')
        document.getElementById('closeSignIn').click()
    }

    const Login = e => {
        document.getElementById('closeSignIn').click()
        document.getElementById('LoginButton').click()

    }

    const fetchData = async (name, email, password) => {
        const headers = new Headers()
        headers.append("Content-Type", "application/json")
        try {
            const response = await fetch(`${process.env.REACT_APP_API_KEY || "http://localhost:8000"}/api/auth/signup`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ name, email, password }),
            })
            const data = await response.json()
            if (response.status === 200) {
                setAuthToken(data.authToken)
            }
            else {
                alert(data.error || data)
                setAuthToken(null)
            }
        } catch (error) {
            console.log(error)
            setAuthToken(null)
        }

    }

    return (
        !authToken &&
        <div className="modal rounded-5 shadow fade no-scroll" id="modalSignin" tabIndex="-1" aria-labelledby="modalSigninTitle" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header p-5 pb-4 border-bottom-0">
                        <h2 className="fw-bold mb-0" id="modalSigninTitle">Sign up for free</h2>
                        <button type="button" id="closeSignIn" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body p-5 pt-0">
                        <form className="" onSubmit={onSubmit} >
                            <div className="form-floating mb-3">
                                <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control rounded-4" id="Name" placeholder="Name" />
                                <label htmlFor="Name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control rounded-4" id="floatingInput" placeholder="name@example.com" />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control rounded-4" id="floatingPassword" placeholder="Password" />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                            <button className="w-100 mb-2 btn btn-lg rounded-4 btn-primary" type="submit">Sign up</button>
                            <small className="text-muted">By clicking Sign up, you agree to the terms of use.</small><br />
                            <small className="text-muted">Already have account? <span className="text-primary"
                            style={{cursor: 'pointer'}} onClick={Login}>Login Here</span></small>
                            <hr className="my-4" />
                            <h2 className="fs-5 fw-bold mb-3">Or use a Social Login</h2>
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

export const SignInBtn = ({text, className}) => {
    const { authToken } = useContext(AuthContext)
    return (
        !authToken ?
            <button type="button" className={className || "btn btn-success mx-2 my-1"} data-bs-toggle="modal" data-bs-target="#modalSignin">
                {text || "Sign Up"}
            </button>
            : null
    )
}