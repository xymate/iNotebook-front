import { useState } from "react";
import noteContext from "./noteContext";

const StateNote = (props) => {
  const host = "https://inotebookbackend-1wyn.onrender.com"
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);
  //GET ALL NOTES
  const getNotes = async () => {

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      }
    });
    const json=await response.json();
    setNotes(json);
  }

  // ADD A NOTE
  const addnote = async (title, description, tag) => {

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      },
      body: JSON.stringify({title, description, tag})
    });

    const note=await response.json();
    setNotes(notes.concat(note))
  }

  // DELETE A NOTE
  const deleteNote = async (id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      }
    });
    // eslint-disable-next-line
    const json=await response.json();
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // EDIT A NOTE
  const editnote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      },
      body: JSON.stringify({title,description,tag}),
    });
    // eslint-disable-next-line
    const json=await response.json()

    let newNotes=JSON.parse(JSON.stringify(notes));


    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    console.log(notes)
    setNotes(newNotes);


  }
  return (
    <noteContext.Provider value={{ notes, addnote, deleteNote, editnote,getNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default StateNote;