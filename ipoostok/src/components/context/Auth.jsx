import React from 'react'
import { authToken as keyToken, dataToken } from '../assets/config'

export const AuthContext = React.createContext({ authToken: null, setAuthToken: null, data:  null, setData: null })

export const Auth = ({ children }) => {
    const [authToken, setToken] = React.useState(localStorage.getItem(keyToken))
    const [data, setuData] = React.useState(JSON.parse(localStorage.getItem(dataToken)))
    const setAuthToken = value => {
        setToken(value)
        if(value) localStorage.setItem(keyToken,value)
        else {
            localStorage.removeItem(keyToken)
            setData(null)
        }
    }

    const setData = data => {
        setuData(data)
        if(data) localStorage.setItem(dataToken,JSON.stringify(data))
        else localStorage.removeItem(dataToken)
    }

    return (
        <AuthContext.Provider value={{ authToken, setAuthToken, data, setData }}>
            {children}
        </AuthContext.Provider>
    )
}
