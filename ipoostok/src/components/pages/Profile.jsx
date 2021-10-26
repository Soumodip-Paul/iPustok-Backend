import { useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import { AuthContext } from '../context/Auth'

export const Profile = () => {
    const { authToken, setAuthToken, data, setData } = useContext(AuthContext)
    const history = useHistory()

    useEffect(() => {
        const fetchUserData = async (authToken) => {
            const response = await fetch(`${process.env.REACT_APP_API_KEY || 'http:localhost:8000'}/api/auth/user`, {
                headers: {
                    'auth-token': authToken
                },
                method: 'POST'
            })

            if (response.status === 200) {
                const data = await response.json()
                setData(data)
            }
            else {
                alert("Something went wrong")
                setAuthToken(null)
                setData(null)
            }
            return
        }
        if (!data && authToken) fetchUserData(authToken)
    }, [authToken, setAuthToken, data, setData, history])

    return (
         authToken ? data ?
            <div className="container">
                {data.name}
            </div>
            :
            <div> Loading </div>
            :
            <div>{history.push('/')}</div>
    )
}
