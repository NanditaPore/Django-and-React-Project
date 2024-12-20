import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({children}) => {
  return (
    <div>
    <Navbar/>
    <main className='h-screen w-full overflow-hidden'>
      {children}
    </main>
    <Footer/>
    </div>
  )
}

export default Layout
