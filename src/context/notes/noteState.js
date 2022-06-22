import React,{useState} from 'react';
import NoteContext  from './noteContext';
const NoteState=(props)=>{
    const host="http://localhost:5000";
    const notesInitial=[ ];

    const [notes,setNotes]=useState(notesInitial);

    //Get all Notes

    const getNote=async()=>{
      const response=await fetch(`${host}/api/notes/fetchallnotes`,{
        method:"GET",
        headers:{
          'content-type':'application/json',
          'auth-token':localStorage.getItem('token')
        }
      });
      const j=await response.json();
      setNotes(j);
    }

    //Add a Note
      const addNote=async (title,description,tag)=>{
        
        const response=await fetch(`${host}/api/notes/addnote`,{
          method:"POST",
          headers:{
            'content-type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
          body:JSON.stringify({title,description,tag})
        });
        let note=await response.json();
        setNotes(notes.concat(note));
        
      }
    //Edit a Note
      const editNote=async (id,title,description,tag)=>{

        const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
          method:"PUT",
          headers:{
            'content-type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
          body:JSON.stringify({title,description,tag})
        });

        let j=await response.json();
        let newNotes=JSON.parse(JSON.stringify(notes));

        for(let index=0;index<newNotes.length;index++)
        {
            const element=newNotes[index];
            if(element._id===id)
            {
              newNotes[index].title=title;
              newNotes[index].description=description;
              newNotes[index].tag=tag;
              break;
            }
        }
        setNotes(newNotes);
      }
    //Delete a Note
      const deleteNote=async (id)=>{
        const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
          method:"DELETE",
          headers:{
            'content-type':'application/json',
            'auth-token':localStorage.getItem('token')
          }
        });
        const j=await response.json();
        const newNotes=notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes);
      }


    return (
       <NoteContext.Provider value={{notes,addNote,editNote,deleteNote,getNote}}>
           {props.children}
       </NoteContext.Provider>
    )
}

export default NoteState;