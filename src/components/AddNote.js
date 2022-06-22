import React, { useState,useContext } from 'react'
import noteContext from '../context/notes/noteContext';


function AddNote() {
    const context=useContext(noteContext);
    const {addNote}=context;
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({"title":"","description":"","tag":""});
    }
    const [note, setNote] = useState({"title":" ","description":" ","tag":"general"});
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }

    return (
        <>
         <h1>Add a Note</h1>
         <div className="my-2">
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title: </label>
                        <input type="text" className="form-control" value={note.title} id="title" name="title" aria-describedby="emailHelp" onChange={onChange}  /> 
                    </div>

                        <label htmlFor="description" className="form-label">Description: </label>

                    <div className="mb-3">
                        <textarea className="form-control" value={note.description} placeholder="Description" name="description" id="description" onChange={onChange} style={{height: "100px"}} ></textarea>
                    </div>

                    <button type="submit" onClick={handleClick} className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default AddNote
