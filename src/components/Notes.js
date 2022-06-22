import React, { useContext, useEffect,useRef,useState } from "react";
import NoteItem from "./NoteItem";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
function Notes() {
  const context = useContext(noteContext);
  const { notes, getNote,editNote } = context;
  let Navigate=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      getNote();
    }
    else
    {
      Navigate('/login');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [note, setNote] = useState({id:"","etitle":"","edescription":"","etag":"general"});
  const updateNote = (currentNote) => { 
      ref.current.click(); 
      setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    };

  const ref=useRef(null);
  const refClose=useRef(null);

  const handleClick=(e)=>{
    e.preventDefault();
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
}
const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}

  return (
    <>
      {/* //Fragments */}
      <AddNote />

      <button ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
               Update Your Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">

            <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title: </label>
                        <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} value={note.etitle} /> 
                    </div>

                        <label htmlFor="description" className="form-label">Description: </label>

                    <div className="mb-3">
                        <textarea className="form-control" placeholder="Description" name="edescription" id="edescription" onChange={onChange} style={{height: "100px"}} value={note.edescription}></textarea>
                    </div>

                    
                </form>

            </div>
            <div className="modal-footer">
              <button
              ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <h1 className="my-4">My Notes:</h1>
      <div className="row">
        <div className="container">
          {notes.length===0 && 'No Notes To Display'}
        </div>
        {notes.map((note,i) => {
          return <div key={i}><NoteItem note={note} updateNote={updateNote} /></div>;
        })}
      </div>
    </>
  );
}

export default Notes;
