import React from "react";
import Note from "../components/Note";
import { useState, useEffect } from "react";
import api from "../api";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateNote = () => {
  const navigate = useNavigate();
  const [note, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const getNotes = async () => {
    try {
      const res = await api.get("/api/notes/");
      setNotes(res.data.reverse());
      console.log(res.data);
    } catch (err) {
      alert(err);
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
        toast.error("Failed to Create Note");
      }
      getNotes();
    } catch (error) {
      toast.error(error);
    }
  };
   const allNotes=()=>{
    navigate("/");
   }


  return (
    <>
      <Toaster position="top-center" />
      {note.length > 0 ? (

        
        <div onClick={allNotes} className="flex items-end justify-end px-8 pb-2 font-medium text-lg animate-bounce text-rose-800"> <button>
        View all Notes</button></div>
      ):("")
      }
        <h2 className="text-pink-950 text-xl py-2 text-center font-bold">Create Your Note</h2>
      <div className=" flex flex-col w-1/2 items-center mx-auto border-2 border-gray-500 rounded-md shadow-lg shadow-gray-500 p-4" >
        <form className="flex flex-col px-2 my-4 w-full" onSubmit={createNote}>
            <div className=" mb-4">

          <label className="m-2 text-lg font-meduim" htmlFor="title">Title :</label>
          <input
            type="text"
            name="title"
            value={title}
            required
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 m-2 p-1 w-full border-gray-200 focus:ring-2 focus:outline-none focus:ring-pink-400 hover:border-pink-500"
          />
            </div>
            <div className="">

          <label className="m-2 text-lg font-meduim" htmlFor="content">Content :</label>
          <textarea 
            name="content" 
            id="content"
            value={content}   
            required
            onChange={(e)=>setContent(e.target.value)}
            className="border-2 w-full my-4 p-4 h-60 overflow-auto  border-gray-200 focus:ring-2 focus:outline-none focus:ring-pink-400 hover:border-pink-500"
            >
            </textarea>
            </div>
                
            <div className="border-2 text-center text-pink-600 hover:bg-pink-500 rounded-md hover:text-white  my-4 mx-28 border-pink-600">
            <input className="py-2  w-full " type="submit" value="submit" />
            </div>
        </form>
      </div>
    </>
  );
};

export default CreateNote;
