export const fetchNotes = async (authToken, setErrors, setAndSaveNotes) => {
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

export const deleteNote = async (id, authToken, notes, setAndSaveNotes) => {
    const response = await fetch(`${process.env.REACT_APP_API_KEY || 'http://localhost:8000'}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
            'auth-token': authToken
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
export  const addNote = async (title, content, tag, authToken, notes, setDesc, setTitle, setTag, setAndSaveNotes) => {
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

export  const updateNote = async (id , title, content, tag, authToken, notes, setNote, onEnd) => {
    const response = await fetch(`${process.env.REACT_APP_API_KEY || 'http://localhost:8000'}/api/notes/updatenote/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'auth-token' : authToken
        },
        body: JSON.stringify({title,content,tag})
    })
    switch (response.status) {
        case 200: 
        const noteArr = JSON.parse(JSON.stringify(notes))
        for(let i = 0; i < noteArr.length; i++){
            if (noteArr[i]._id === id ){
                const newNote = await response.json()
                noteArr[i] = newNote
                break;
            }
        }
        setNote(noteArr)
        alert("Note updated successfully") 
        break;
        case 401: alert("You are not allowed to edit this note"); break;
        case 400: alert("Note not found"); break;
        default: alert("Some error occured");
    }
    onEnd()
}
