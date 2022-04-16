import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/Auth'
import { noteKey } from '../assets/config'
import { fetchNotes, deleteNote, addNote, pinNote } from '../adapters/network'
import { EditNote } from '../utils/EditNote'
import { PaginatedNote } from '../utils/PaginatedNote'

export const Dashboard = () => {

    const [notes, setNotes] = useState(JSON.parse(sessionStorage.getItem(noteKey)))
    const [errors, setErrors] = useState("No notes available...")
    const [title, setTitle] = useState("")
    const [tag, setTag] = useState("")
    const [desc, setDesc] = useState("")
    const [loading, isLoading] = useState(false)
    const [note, setUpNote] = useState({ _id: '', title: '', tag: '', content: '' })
    const { authToken } = useContext(AuthContext)

    const setAndSaveNotes = (data) => {
        data.sort((a,b) => {
            const date1 = new Date(a.date)
            const date2 = new Date(b.date)
            
            return date2 - date1;
        })
        data.sort((a,b) => b.pinned - a.pinned)
        setNotes(data)
        if (data) sessionStorage.setItem(noteKey, JSON.stringify(data))
        else sessionStorage.removeItem(noteKey)
    }

    useEffect(() => {
        if (!notes) {
            isLoading(true)
            fetchNotes(authToken, setErrors, setAndSaveNotes).then(() => isLoading(false)).catch(err => isLoading(false))
        }
    }, [setNotes, notes, authToken])

    const onSubmit = e => {
        e.preventDefault()
        addNote(title, desc, tag, authToken, notes, setDesc, setTitle, setTag, setAndSaveNotes)
    }
    return (
        <main>
            <section className="py-5 text-start container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">Album example</h1>
                        <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>

                    </div>
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
                        <button disabled={title.length === 0 || desc.length === 0} type="submit" className="btn btn-primary px-4 rounded-pill mb-3">Add Note</button>
                    </form>
                </div>
            </section>
            {!loading ? notes && notes.length > 0 ?
                <>
                    <EditNote note={note} notes={notes} setNotes={setAndSaveNotes} />
                    <PaginatedNote notes={notes} setAndSaveNotes={setAndSaveNotes} authToken={authToken} setUpNote={setUpNote} deleteNote={deleteNote} PinNote={pinNote} />
                </>
                :
                <h3 className="text-center fst-italic p-3">{errors}</h3>
                :
                <div className="text-center w-100">
                    <div className="spinner-border text-secondary text-center" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
        </main>
    )
}
