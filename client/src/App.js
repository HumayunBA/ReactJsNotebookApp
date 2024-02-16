import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {

    const storedNotes = JSON.parse(localStorage.getItem('notes'));
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  useEffect(() => {

    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (e) => {

    e.preventDefault();
    if (newNote.trim() !== '') {
      setNotes([...notes, { id: Date.now(), content: newNote }]);
      setNewNote('');
      inputRef.current.focus();
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="App">
      <h1>Notes App</h1>

      <AddNoteForm
        newNote={newNote}
        setNewNote={setNewNote}
        addNote={addNote}
        inputRef={inputRef}
      />
      <NoteList notes={notes} deleteNote={deleteNote} />

    </div>
  );
};

const AddNoteForm = ({ newNote, setNewNote, addNote, inputRef }) => {
  const handleChange = (e) => {
    setNewNote(e.target.value);
  };

  return (
    <form onSubmit={addNote}>
      <input
        type="text"
        value={newNote}
        onChange={handleChange}
        placeholder="Add a note..."
        ref={inputRef}
      />
      <button type="submit">Add Note</button>
    </form>
  );
};

const NoteList = ({ notes, deleteNote }) => {
  return (
    <div>
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} deleteNote={deleteNote} />
      ))}
    </div>
  );
};

const NoteItem = ({ note, deleteNote }) => {
  return (
    <div className="note">
      <p>{note.content}</p>
      <br></br>
      <button onClick={() => deleteNote(note.id)}>Delete</button>
    </div>
  );
};

export default App;
