import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note"
import "../styles/Home.css"
import LogoutButton from "../components/LogoutButton";

function Home() {
  // State variables to manage notes, title, and content of notes
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  // Effect to fetch notes on component mount
  useEffect(() => {
    getNotes();
  }, []);

  // Function to fetch notes from the server
  const getNotes = () => {
    api.get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);  // Set fetched notes to state
        console.log(data);  // Log data for debugging
      })
      .catch((err) => alert(err));  // Handle any errors
  };

  // Function to handle deleting a note
  const deleteNote = (id) => {
    api.delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");  // Notify successful deletion
        else alert("Failed to delete note.");  // Notify failure
        getNotes();  // Refresh notes after deletion
      })
      .catch((error) => alert(error));  // Handle errors
  };

  // Function to handle creating a new note
  const createNote = (e) => {
    e.preventDefault();  // Prevent default form submission behavior
    api.post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created!");  // Notify successful creation
        else alert("Failed to make note.");  // Notify failure
        getNotes();  // Refresh notes after creating
      })
      .catch((err) => alert(err));  // Handle errors
  };

  return (
    <div>
    <LogoutButton></LogoutButton>
      <div>
        <h2>Notes</h2>
       
        {/* Map over notes and pass each note to the Note component */}
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
      <h2>Create a Note</h2>
      {/* Form for creating a new note */}
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          id="content"
          name="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default Home;
