import React from 'react'
// import { fetchNotes, deleteNote, addNote } from '../adapters/network'
import { NoteView } from '../adapters/NoteView'

export const PaginatedNote = ({ notes, deleteNote, setAndSaveNotes, setUpNote, authToken, PinNote }) => {
    const paginatedNotes = PaginateData(notes, 6)
    return (
        <div className="album pt-0 pb-5 bg-light">
            <h4 className="text-center fw-bold py-4 sticky-top" style={{ background: '#f8f9fa' }}>Your Notes</h4>
            <div className="container pt-2">
                <div id="carouselExampleIndicators" className="carousel slide" data-interval="false">
                    <div className="carousel-indicators" style={{bottom: '-2.5rem'}}>
                        {paginatedNotes.map(
                            (e, i) => i === 0 ? <button key={`button${i}`} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active bg-dark" aria-current="true" aria-label="Slide 1"></button>
                                :
                                <button key={`button${i}`} type="button" className="bg-dark" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={`${i}`} aria-label={`Slide ${i + 1}`}></button>
                        )}
                    </div>
                    <div className="carousel-inner pt-3">
                        {paginatedNotes.map((pageNotes, i) => i === 0 ?
                            <div key={`pages${i}`} className="carousel-item active">
                                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                                    {pageNotes.map((note, i) => <NoteView key={note._id} note={note} deleteNote={e => deleteNote(note._id, authToken, notes, setAndSaveNotes)} editNote={e => setUpNote(note)} PinNote={ e=> PinNote(note._id,authToken,notes,setAndSaveNotes)} />)}
                                </div>
                            </div> :
                            <div key={`pages${i}`} className="carousel-item">
                                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                                    {pageNotes.map((note, i) => <NoteView key={note._id} note={note} deleteNote={e => deleteNote(note._id, authToken, notes, setAndSaveNotes)} editNote={e => setUpNote(note)} />)}
                                </div>
                            </div>
                        )}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev" >
                            <span className="carousel-control-prev-icon te" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                </div>
            </div>
        </div>
        // </div>
    )
}

const PaginateData = (notes, itemsPerPage) => {
    // const notes = [1,2,3,4,5,6]
    const paginatedData = []
    for (let i = 1; i <= Math.ceil(notes.length / itemsPerPage); i++) {
        paginatedData.push(notes.slice((i - 1) * itemsPerPage, i * itemsPerPage))
    }
    return paginatedData;
}
