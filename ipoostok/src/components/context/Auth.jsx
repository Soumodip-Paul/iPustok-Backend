import React from 'react'
import { authToken as keyToken } from '../assets/config'

export const AuthContext = React.createContext({ authToken: null, setAuthToken: null })

export const Auth = ({ children }) => {
    const [authToken, setToken] = React.useState(localStorage.getItem(keyToken))
    const setAuthToken = value => {
        setToken(value)
        if(value) localStorage.setItem(keyToken,value)
        else localStorage.removeItem(keyToken)
    }
    return (
        <AuthContext.Provider value={{ authToken, setAuthToken }}>
            {children}
        </AuthContext.Provider>
    )
}
