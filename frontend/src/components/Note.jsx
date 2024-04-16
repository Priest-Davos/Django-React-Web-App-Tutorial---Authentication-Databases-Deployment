import React from "react";
import "../styles/Note.css"

// Note component that displays individual notes
function Note({ note, onDelete }) {
    // Format the creation date of the note to local string
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

    return (
        <div className="note-container">
            {/* Display the title of the note */}
            <p className="note-title">{note.title}</p>
            {/* Display the content of the note */}
            <p className="note-content">{note.content}</p>
            {/* Display the formatted creation date of the note */}
            <p className="note-date">{formattedDate}</p>
            {/* Button to trigger deletion of a note using its id */}
            <button className="delete-button" onClick={() => onDelete(note.id)}>
                Delete
            </button>
        </div>
    );
}

export default Note;
