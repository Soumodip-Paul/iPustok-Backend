import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

export const GetPage = () => {
    const [page, setPage] = useState(null)
    const { url } = useParams()
    useEffect(() => {
        const fetchdata = async (url) => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_KEY || "http://localhost:8000"}/api/page/${url}`)
                if (response.status !== 200) {
                    setPage(null)
                    document.getElementById('page').innerHTML = "Page not found"
                    return
                }
                const data = await response.json()
                setPage(data)
                document.getElementById('page').innerHTML = data.content
            }
            catch (error) {
                console.log(error)
                setPage(null)
                // document.getElementById('page').innerHTML = "Some error occured"
                return
            }
        }
        if(url !== 'admin' && url !== 'profile') fetchdata(url)
    }, [url, setPage])
    return (
        page && <div className="container my-3" id="page"></div>
    )
}
