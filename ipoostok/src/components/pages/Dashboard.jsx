import { useState, useEffect, useContext } from 'react'
import { NoteView } from '../adapters/NoteView'
import { AuthContext } from '../context/Auth'

export const Dashboard = () => {

    const [notes, setNotes] = useState(null)
    const [errors, setErrors] = useState("No notes available...")
    const { authToken } = useContext(AuthContext)

    useEffect(() => {
        const fetchNotes = async (authToken) => {
            const response = await fetch(`${process.env.REACT_APP_API_KEY || 'http://localhost:8000'}/api/notes/getallnotes`, {
                method: 'POST',
                headers: {
                    'auth-token': authToken
                }
            })
            if (response.status === 200) {
                const data = await response.json()
                setNotes(data)
                if (data.length === 0) setErrors('No notes available...')
            }
            else {
                setNotes(null)
                setErrors("Some error occured")
            }
        }
        fetchNotes(authToken)
    }, [setNotes, authToken])


    const onSubmit = e => {
        e.preventDefault()
    }
    return (
        <main>
            <section className="py-5 text-start container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">Album example</h1>
                        <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>

                    </div>
                    <form className='text-start col-lg-6 col-md-8 mx-auto' onSubmit={onSubmit}>
                        <h1 className="fw-light mb-3">Add Your Notes</h1>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="NoteTag" placeholder="add your tag" />
                            <label htmlFor="NoteTag">Tag</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="NoteTitle" placeholder="Title" />
                            <label htmlFor="NoteTitle">Title</label>
                        </div>
                        <div className="form-floating mb-3">
                            <textarea className="form-control" placeholder="Add your noteDescription" id="noteDescription"></textarea>
                            <label htmlFor="noteDescription">Description</label>
                        </div>
                        <button type="submit" className="btn btn-primary px-4 rounded-pill">Add Note</button>
                    </form>
                </div>
            </section>
            {notes && notes.length > 0 ?
                <div className="album py-5 bg-light">
                    <div className="container">

                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                            {notes.map(note => <NoteView key={note.id} note={note} />)}
                        </div>

                    </div>
                </div>
                :
                <h3 className="text-center fst-italic p-3">{errors}</h3>
            }
        </main>
    )
}
