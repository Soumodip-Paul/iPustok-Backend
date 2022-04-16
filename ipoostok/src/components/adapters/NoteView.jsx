import React from 'react'
import Pin from '../assets/svg/pin.svg'
import { EditButton } from '../utils/EditNote';

export const NoteView = ({ note, deleteNote, editNote, PinNote }) => {
    return (
        <div className="col">
            <div className="card shadow-sm">
                <span className="position-absolute px-4 py-1 fs-6 top-0 start-50 translate-middle badge rounded-pill bg-success fw-light">
                    {note.tag}
                    <span className="visually-hidden">Your Tag</span>
                </span>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{`${note.content}`.length > 150 ? note.content.slice(0, 150) + '...' : note.content}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <EditButton onClick={editNote} />
                            <button onClick={deleteNote} type="button" className="btn btn-sm btn-outline-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000">
                                    <use xlinkHref={`${Pin}#delete`} />
                                </svg></button>
                            <button onClick={PinNote} type="button" className="btn btn-sm btn-outline-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000">
                                    <use xlinkHref={ note.pinned ? `${Pin}#pinned` : `${Pin}#not-pinned`} />
                                </svg>
                            </button>
                        </div>
                        <small className="text-muted">{formatTime(note.date)}</small>
                    </div>
                </div>
            </div>
        </div>
    )
}



const formatTime = (date) => {

    var seconds = Math.floor((new Date() - new Date(date)) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";

}
