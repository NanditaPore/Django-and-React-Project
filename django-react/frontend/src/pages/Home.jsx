import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Form.css";
import toast, { Toaster } from "react-hot-toast";
import "../styles/Home.css";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const notesPerPage = 4; // Number of notes to display per page

  const getNotes = async () => {
    try {
      const res = await api.get("/api/notes/");
      setNotes(res.data);
      console.log(res.data);
    } catch (err) {
      alert(err);
    }
  };

  const deleteNote = async (id) => {
    try {
      const res = await api.delete(`/api/notes/delete/${id}/`);
      if (res.status === 204) {
        toast.success("Note Deleted");
        getNotes();
      } else {
        toast.error("Failed to delete Note");
      }
    } catch (error) {
      toast.error("Error deleting note");
    }
  };

  const createNote = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/notes/", { content, title });
      if (res.status === 201) {
        toast.success("Note Created Successfully");
        window.location.reload();
      } else {
        toast.error("Failed to create note");
      }
      getNotes();
    } catch (error) {
      toast.error("Error creating note");
    }
  };

  const handleNext = () => {
    if (currentIndex + notesPerPage < notes.length) {
      setCurrentIndex(currentIndex + notesPerPage); // Move to the next note
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - notesPerPage); // Move to the previous note
    }
  };

  // Slice the notes array to only display the notes in the current window
  const displayedNotes = notes.slice(currentIndex, currentIndex + notesPerPage);

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div>
      <h2>Notes</h2>
      <div className="carousel-container">
        {/* Carousel notes */}
        <div className="carousel-notes">
          {displayedNotes.map((note) => (
            <div className="note" key={note.id}>
              <Note note={note} onDelete={deleteNote} />
            </div>
          ))}
        </div>

        {/* Left arrow button */}
        {currentIndex > 0 && (
          <button className="arrow-button arrow-left" onClick={handlePrev}>
            &#8592;
          </button>
        )}

        {/* Right arrow button */}
        {currentIndex + notesPerPage < notes.length && (
          <button className="arrow-button arrow-right" onClick={handleNext}>
            &#8594;
          </button>
        )}
      </div>

      <Toaster position="top-center" />
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title: </label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label htmlFor="content">Content: </label>
        <br />
        <textarea
          id="content"
          name="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Home;
