import React, { useState } from 'react'
import { PopupContext } from '../../App'
import { NoteView } from '../adapters/NoteView'

export const PaginatedNote = ({ notes, deleteNote, setAndSaveNotes, setUpNote, authToken, PinNote }) => {
    const paginatedNotes = PaginateData(notes, 6)
    const [currentPage, setCurrentPage] = useState(0)
    const { showAlert } = React.useContext(PopupContext)
    return (
        <div className="album pt-0 pb-5 bg-light">
            <h4 className="text-center fw-bold py-4 sticky-top" style={{ background: '#f8f9fa' }}>Your Notes</h4>
            <div className="container pt-2">
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-interval="false">
                    <div className="carousel-inner pt-3">
                        {paginatedNotes.map((pageNotes, i) => i === 0 ?
                            <div key={`pages${i}`} className="carousel-item active">
                                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                                    {pageNotes.map((note, i) => <NoteView key={note._id} note={note} deleteNote={e => deleteNote(note._id, authToken, notes, setAndSaveNotes, showAlert)} editNote={e => setUpNote(note)} PinNote={e => PinNote(note._id, authToken, notes, setAndSaveNotes, showAlert)} />)}
                                </div>
                            </div> :
                            <div key={`pages${i}`} className="carousel-item">
                                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                                    {pageNotes.map((note, i) => <NoteView key={note._id} note={note} deleteNote={e => deleteNote(note._id, authToken, notes, setAndSaveNotes, showAlert)} editNote={e => setUpNote(note)} PinNote={e => PinNote(note._id, authToken, notes, setAndSaveNotes, showAlert)} />)}
                                </div>
                            </div>
                        )}
                    </div>
                    {paginatedNotes.length > 1 &&  <div className='d-flex' style={{ bottom: '-2.5rem' }}>
                        <nav className='mx-auto mt-3' aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item">
                                    <button className="page-link" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev" onClick={ e => setCurrentPage( 0) } >
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                </li>
                                { paginatedNotes.map(
                                    (e, i) =>
                                    <li key={`button${i}`} className="page-item"><button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={i} className={`page-link ${i === currentPage && "active"}`} aria-current="true" aria-label={`Slide ${i+1}`} onClick={e => setCurrentPage(i)}> {i + 1} </button></li>
                                )}
                                <li className="page-item">
                                    <button className="page-link" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next" onClick={ e => setCurrentPage( 1 ) }>
                                        <span aria-hidden="true">&raquo;</span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>}
                </div>
            </div>
        </div>
    )
}

const PaginateData = (notes, itemsPerPage) => {
    const paginatedData = []
    for (let i = 1; i <= Math.ceil(notes.length / itemsPerPage); i++) {
        paginatedData.push(notes.slice((i - 1) * itemsPerPage, i * itemsPerPage))
    }
    return paginatedData;
}
