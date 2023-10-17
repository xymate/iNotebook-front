import React, { useState } from 'react'
import { useContext } from 'react';
import noteContext from '../context/noteContext';

const AddNote = () => {
    const context=useContext(noteContext);
    const {addnote}=context;  
    const [note,setNote]=useState({title:"",description:"",tag:""});
    const handleClick=(e)=>{
        e.preventDefault()
        addnote(note.title,note.description,note.tag);
        setNote(({title:"",description:"",tag:""}))
    }
    const handleChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
        <div className="container my-3 mx-5">
                <h1>Add a note</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" value={note.title} id="title" name="title" aria-describedby="emailHelp" onChange={handleChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">description</label>
                        <input type="text" className="form-control" value={note.description} id="description" name="description" onChange={handleChange}  minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" value={note.tag} id="tag" name="tag" onChange={handleChange} />
                    </div>
                    
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Create</button>
                </form>
            </div>
    </div>
  )
}

export default AddNote