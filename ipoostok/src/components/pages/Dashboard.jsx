import { useState, useEffect, useContext } from 'react'
import { NoteView } from '../adapters/NoteView'
import { AuthContext } from '../context/Auth'
import { noteKey } from '../assets/config'

export const Dashboard = () => {

    const [notes, setNotes] = useState(JSON.parse(sessionStorage.getItem(noteKey)))
    const [errors, setErrors] = useState("No notes available...")
    const [title, setTitle] = useState("")
    const [tag, setTag] = useState("")
    const [desc, setDesc] = useState("")
    const { authToken } = useContext(AuthContext)

    const setAndSaveNotes = (data) => {
        setNotes(data)
        if(data) sessionStorage.setItem(noteKey, JSON.stringify(data))
        else sessionStorage.removeItem(noteKey)
    }

    const addNote = async (title, content, tag) => {
        const response = await fetch(`${process.env.REACT_APP_API_KEY || 'http://localhost:8000'}/api/notes/addnote`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token' : authToken
            },
            body: JSON.stringify({title,content,tag})
        })
        if (response.status === 200 ){
        const data = await response.json()
        if (notes) {
            notes.unshift(data)
            setAndSaveNotes(notes)
        }
        else setAndSaveNotes([data])
        }

        setDesc('')
        setTag('')
        setTitle('')
    }

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
                setAndSaveNotes(data.reverse())
                if (data.length === 0) setErrors('No notes available...')
            }
            else {
                setAndSaveNotes(null)
                setErrors("Some error occured")
            }
        }
        if(!notes) fetchNotes(authToken)
    }, [setNotes, notes, authToken])

    const deleteNote = async (id) => {
        const response = await fetch(`${process.env.REACT_APP_API_KEY || 'http://localhost:8000'}/api/notes/deletenote/${id}`,{
            method: 'DELETE',
            headers: {
                'auth-token' : authToken
            }
        })
        const data = await response.json()
        if (data.success) {
            const newNotes = notes.filter(e => e._id !== id)
            setAndSaveNotes(newNotes)
        }
        else {
            alert(data)
        }
    }


    const onSubmit = e => {
        e.preventDefault()
        addNote(title,desc,tag)
    }
    return (
        <main>
            <section className="py-5 text-start container">
                <div className="row py-lg-5">
                    <form className='text-start col-lg-6 col-md-8 mx-auto' onSubmit={onSubmit}>
                        <h1 className="fw-light mb-3">Add Your Notes</h1>
                        <div className="form-floating mb-3">
                            <input value={tag} onChange={e => setTag(e.target.value)} type="text" className="form-control" id="NoteTag" placeholder="add your tag" />
                            <label htmlFor="NoteTag">Tag</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={title} onChange={e => setTitle(e.target.value)} type="text" className="form-control" id="NoteTitle" placeholder="Title" />
                            <label htmlFor="NoteTitle">Title</label>
                        </div>
                        <div className="form-floating mb-3">
                            <textarea value={desc} onChange={e => setDesc(e.target.value)} className="form-control" placeholder="Add your noteDescription" id="noteDescription"></textarea>
                            <label htmlFor="noteDescription">Description</label>
                        </div>
                        <button disabled={title.length === 0 || desc.length === 0 } type="submit" className="btn btn-primary px-4 rounded-pill mb-3">Add Note</button>
                    </form>
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">Album example</h1>
                        <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>

                    </div>
                </div>
            </section>
            {notes && notes.length > 0 ?
                <div className="album py-5 bg-light">
                    <div className="container">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                            {notes.map(note => <NoteView key={note._id} note={note} deleteNote={e => deleteNote(note._id)} />)}
                        </div>

                    </div>
                </div>
                :
                <h3 className="text-center fst-italic p-3">{errors}</h3>
            }
        </main>
    )
}
