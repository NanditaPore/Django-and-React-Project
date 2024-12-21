import React from "react";
// import "../styles/Note.css";
import { useState } from "react";


const Note = ({note,onDelete}) => {
    const [open , setOpen]=useState(false);
    const [view , setView]=useState(false);

    const formatedDate = new Date(note.created_at).toLocaleDateString("en-US")

    const openModal=()=>{
      setOpen(true);
    };
    const closeModal=()=>{
      setOpen(false);
    };
    const openView=()=>{
      setView(true);
    };
    const closeView=()=>{
      setView(false);
    };

   
    const formatedTitle = (note.title.length> 25 ? note.title.slice(0,25)+'...': note.title)
  
    const formatedContent = (note.content.length > 400 ? note.content.slice(0,400)+'...':note.content)
    const formatedContentTab = (note.content.length > 200 ? note.content.slice(0,200)+'...':note.content)

  return (
    <>
    <div className="flex flex-col shadow-xl shadow-gray-500  border-rose-300 border-4 rounded-lg m-2 p-2 w-full">
      <p className="text-pink-950 py-2 font-bold ">
        
        {formatedTitle}
        {console.log(formatedTitle)}
      </p>
      <p className="text-gray-700 lg:block hidden  md:hidden text-sm break-words mt-2">
    {formatedContent}
  </p>
  <p className="text-gray-700 md:block lg:hidden  text-sm break-words mt-2">
    {formatedContentTab}
  </p>

      <div className="lg:flex md:block flex justify-between my-2  mt-auto items-center">

      <p className="note-date hidden md:block  font-medium">
       Date :  {formatedDate}
      </p>
      <p className="md:hidden   font-medium">
       {formatedDate}
      </p>
      <button className="rounded-xl font-medium border-2 m-2 py-1 px-2 hover:bg-red-700  hover:text-white  border-red-700 text-red-700" onClick={openModal}>
        Delete
      </button>
      <button className="rounded-xl text-nowrap font-medium border-2 m-2 py-1 px-2 hover:bg-fuchsia-700  hover:text-white  border-fuchsia-700 text-fuchsia-700" onClick={openView}>
        View Full
      </button>
     
      </div>
  {open && (
    <div className="fixed  inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white border-2 border-gray-600 rounded-lg px-6 py-2 relative">
          <button className=" absolute top-1 right-2 text-lg font-medium text-gray-600 hover:text-black  rounded-lg " onClick={closeModal}>x</button>
        <div className="text-lg pt-4 pb-2 px-4 font-medium w-full">

          Are you sure, you want to delete note ?

        </div>
        <div className="flex justify-end  items-end my-4">
          <button className="py-1 px-4 rounded-lg border-2 font-medium border-red-600 text-red-600" onClick={()=> onDelete(note.id)}>Yes</button>
          {/* <button className="p-2 rounded-lg border-2 border-green-600 text-green-600" onClick={closeModal}>No</button> */}
        </div>
      </div>
    </div>
  )
  }
  {view && (
    <div className="fixed w-full md:w-1/2 right-0 top-1 bg-white shadow-md shadow-gray-600 h-screen z-10 ">
      <div className=" justify-between items-center flex p-6">
        <p className="font-semibold">Date : {formatedDate}</p>
        <button className="bg-rose-500 text-white hover:bg-rose-700 p-2 rounded-lg" onClick={closeView}>Close</button>

      </div>
      <div className="p-6 overflow-y-auto gap-2">
      
        <h5 className="font-bold break-words text-lg">{note.title}</h5>
        <p className="break-words py-4">
          {note.content}
        </p>
      </div>
    </div>
  )

  }
    </div>
    </>
  )
}

export default Note
