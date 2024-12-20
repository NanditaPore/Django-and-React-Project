import React from "react";
// import "../styles/Note.css"


const Note = ({note,onDelete}) => {
    const formatedDate = new Date(note.created_at).toLocaleDateString("en-US")
   
    const formatedTitle = (note.title.length> 30 ? note.title.slice(0,30)+'...': note.title)
  
    const formatedContent = (note.content.length > 400 ? note.content.slice(0,400)+'...':note.content)

  return (
    <div className="flex flex-col shadow-xl shadow-gray-500 rounded-md m-2 p-2 w-full">
      <p className="text-pink-950 py-2 font-bold ">
        
        {formatedTitle}
        {console.log(formatedTitle)}
      </p>
      <p className="text-gray-700 text-sm break-words mt-2">
    {formatedContent}
  </p>
      <div className="flex justify-between my-2  mt-auto items-center">

      <p className="note-date">
       Date :  {formatedDate}
      </p>
      <button className="rounded-xl border m-2 py-1 px-2 hover:bg-red-700  hover:text-white  border-red-700 text-red-700" onClick={()=> onDelete(note.id)}>
        Delete
      </button>
      </div>
    </div>
  )
}

export default Note
