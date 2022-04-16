import { useState, useEffect, useContext, useRef } from 'react'
import { updateNote } from '../adapters/network'
import { AuthContext } from '../context/Auth'
import Pin from '../assets/svg/pin.svg'

export const EditNote = ({ note, notes, setNotes }) => {
    const [tag, setTag] = useState(note.tag)
    const [title, setTitle] = useState(note.title)
    const [desc, setDesc] = useState(note.content)
    const [id, setId] = useState(note._id)
    const closeRef = useRef(null)
    const { authToken } = useContext(AuthContext)
    const onEnd = () => closeRef.current.click()
    useEffect(() => {
        setTag(note.tag)
        setDesc(note.content)
        setTitle(note.title)
        setId(note._id)
    }, [note])
    return (
        <div className="modal fade" id="editModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="editModalLabel">Edit Your Notes</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className='text-start col-lg-12 col-md-12 mx-auto'>
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
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeRef}>Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal"  onClick={e => updateNote(id, title, tag, desc, authToken, notes, setNotes, onEnd)}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const EditButton = ({ onClick }) => {
    return (
        <button type="button" className="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#editModal" onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000">
                <use xlinkHref={`${Pin}#edit`} />
            </svg>
        </button>
    )
}