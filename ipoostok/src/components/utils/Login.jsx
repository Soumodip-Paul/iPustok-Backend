import React from 'react'
import { AuthContext } from '../context/Auth'

export const Login = () => {

    const {authToken, setAuthToken} = React.useContext(AuthContext)
    const onSubmit = e => {
        e.preventDefault()
        console.log("object")
        document.getElementById('closeLogin').click()
        setAuthToken('hi')
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
                                <input type="email" className="form-control rounded-4" id="LoginEmail" placeholder="name@example.com" />
                                <label htmlFor="LoginEmail">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control rounded-4" id="LoginPassword" placeholder="Password" />
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
                  LogOut(setAuthToken); 
                  document.getElementById('closeLogin').click()
                  }}>Log Out</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export const LoginButton = () => {
    const {authToken} = React.useContext(AuthContext)
    return(

        <button type="button" className="btn btn-primary mx-2 my-1" data-bs-toggle="modal" data-bs-target="#modalLogin">
            {!authToken ? "Log In" : "Log Out"}
        </button>
    )
} 

const LogOut = (setAuthToken) => {
    // localStorage.removeItem(key)
    setAuthToken(null)
}