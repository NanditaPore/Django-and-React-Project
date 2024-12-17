import { useState, useEffect } from "react";
import api from "../api";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const getNotes = async () => {
    try {
      const res = await api.get("/api/notes/");
      setNotes(res.data);
      console.log(res.data);
    } catch (err) {
      alert(err);
    }
  };

  const deleteNotes = async (id) => {
    try {
      const res = await api.delete("/api/notes/delete/");
      if (res.status === 204) {
        alert("Note Deleted");
      } else {
        alert("Failed to delete Note");
      }
      getNotes();
    } catch (error) {
      alert(error);
    }
  };

  const createNote = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/notes/", { content, title });
      if (res.status === 201) {
        alert("Note Created Successfully");
      } else {
        alert("Failed to create note");
      }
      getNotes();
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div>
      <div>
        <h1>Notes</h1>
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input type="text" id="title" />
      </form>
    </div>
  );
};

export default Home;
