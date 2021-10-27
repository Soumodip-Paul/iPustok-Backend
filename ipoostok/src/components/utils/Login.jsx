import { useState, useContext } from 'react'
import { AuthContext } from '../context/Auth'

export const Login = () => {

    const { authToken, setAuthToken } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const onSubmit = e => {
        e.preventDefault()
        fetchData(email,password)
        setEmail('')
        setPassword('')
        document.getElementById('closeLogin').click()
    }

    const fetchData = async (email, password) => {
        const headers = new Headers()
        headers.append("Content-Type", "application/json")
        try {
            const response = await fetch(`${process.env.REACT_APP_API_KEY || "http://localhost:8000"}/api/auth/login`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ email, password }),
            })
            const data = await response.json()
            if (response.status === 200) {
                setAuthToken(data.authToken)
            }
            else {
                alert(data)
                setAuthToken(null)
            }
        } catch (error) {
            console.log(error)
            setAuthToken(null)
        }

    }

    return (
        !authToken ?
            <div className="modal rounded-5 shadow fade" id="modalLogin" tabIndex="-1" aria-labelledby="modalLoginTitle" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header p-5 pb-4 border-bottom-0">
                            <h2 className="fw-bold mb-0" id="modalLoginTitle">Login </h2>
                            <button type="button" className="btn-close" id="closeLogin" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-5 pt-0">
                            <form className="" onSubmit={onSubmit} >
                                <div className="form-floating mb-3">
                                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control rounded-4" id="LoginEmail" placeholder="name@example.com" />
                                    <label htmlFor="LoginEmail">Email address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control rounded-4" id="LoginPassword" placeholder="Password" />
                                    <label htmlFor="LoginPassword">Password</label>
                                </div>
                                <button className="w-100 mb-2 btn btn-lg rounded-4 btn-primary" type="submit">Log In</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div> :

            <div className="modal rounded-5 shadow fade" id="modalLogin" tabIndex="-1" aria-labelledby="modalLoginTitle" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalLoginTitle">Do you want to logout ?</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure to Log Out from current session</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" id="closeLogin" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={e => {
                                document.getElementById('closeLogin').click()
                                sessionStorage.clear()
                                setTimeout(() =>  setAuthToken(null), 300)
                            }}>Log Out</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export const LoginButton = () => {
    const { authToken } = useContext(AuthContext)
    return (
        <button type="button" className="btn btn-primary mx-2 my-1" data-bs-toggle="modal" data-bs-target="#modalLogin">
            {!authToken ? "Log In" : "Log Out"}
        </button>
    )
}