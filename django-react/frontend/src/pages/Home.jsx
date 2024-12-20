import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Form.css";
import toast, { Toaster } from "react-hot-toast";
// import "../styles/Home.css";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const notesPerPage = 3; // Number of notes to display per page

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
    <div className=" m-4">
      <h2 className="px-6 pb-2 text-lg text-center font-bold">Notes</h2>
      <div className="flex w-full">
        {/* Carousel notes */}
        

        <div className="flex items-center justify-center gap-4 w-full">
          {displayedNotes.map((note) => (
            <div className="w-1/4   flex h-80 " key={note.id}>
              <Note note={note} onDelete={deleteNote} />
            </div>
          ))}
        </div>
        </div>
       

                {/* Left arrow button */}
                {currentIndex > 0 && (
                  <button className="bg-gray-400 p-4 px-6 absolute top-72 rounded-full" onClick={handlePrev}>
            &#8592;
          </button>
        )}
    


        {/* Right arrow button */}
        {currentIndex + notesPerPage < notes.length && (
          <button className="bg-red-400 absolute top-72 right-3 p-4 px-6 rounded-full items-end" onClick={handleNext}>
            &#8594;
          </button>
        )}
       
      

      <Toaster position="top-center" />
      {/* <h2>Create a Note</h2>
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
      </form> */}
    </div>
  );
};

export default Home;
