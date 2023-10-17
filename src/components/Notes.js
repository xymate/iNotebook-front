import React from 'react'
import { useContext, useEffect, useRef ,useState} from 'react';
import noteContext from '../context/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
  const context = useContext(noteContext);
  let Navigate =useNavigate()
  const { notes, getNotes,editnote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
    }
    else{
      Navigate('/login')
    }
  })

  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:"default"});

  const ref = useRef(null)
  const refClose = useRef(null)

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  }
  
    const handleClick=(e)=>{
      console.log("update the note..",note)
      editnote(note.id,note.etitle,note.edescription,note.etag);
       refClose.current.click();
    }
    const handleChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }

  return (
    <>
      <AddNote />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit a Note</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <form>
                    <div className="mb-3">
                        <label htmlFor="etitle" className="form-label">Title</label>
                        <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={handleChange}  minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="edescription" className="form-label">description</label>
                        <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={handleChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="etag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={handleChange} />
                    </div>
                </form>
            </div>
            <div class="modal-footer">
              <button ref={refClose} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5}  onClick={handleClick}type="button" class="btn btn-primary">Update notes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your notes</h1>
        <div className="container">
          {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} />;
        })}
      </div>
    </>
  )
}

export default Notes
