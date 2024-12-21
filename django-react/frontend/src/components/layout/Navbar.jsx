import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const createNote= ()=>{
    navigate('/createnote');
  }
  
  const logout=()=>{
    navigate('/logout');
  }
  const home=()=>{
    navigate('/');
  }

  return (
    <div className="bg-rose-400 p-6 flex shadow-md shadow-gray-500 justify-between mb-10 text-lg">
      <div onClick={home} className='text-white font-serif text-xl md:text-2xl'>

      Let's Note
      </div>
<div className='flex gap-4 text-white text-lg md:text-xl'>
  <button onClick={createNote}>
    Create Note
    </button>
    <button onClick={logout}>
      Logout
    </button>
</div>
    </div>
  )
}

export default Navbar
