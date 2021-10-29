import React from 'react'
import { authToken as keyToken, dataToken } from '../assets/config'

export const AuthContext = React.createContext({ authToken: null, setAuthToken: null, data:  null, setData: null })

export const Auth = ({ children }) => {
    const [authToken, setToken] = React.useState(localStorage.getItem(keyToken))
    const [data, setData] = React.useState(JSON.parse(localStorage.getItem(dataToken)))
    const setAuthToken = value => {
        setToken(value)
        if(value) localStorage.setItem(keyToken,value)
        else {
            localStorage.clear()
            sessionStorage.clear()
        }
    }

    return (
        <AuthContext.Provider value={{ authToken, setAuthToken, data, setData }}>
            {children}
        </AuthContext.Provider>
    )
}
