// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Manager from './components/Manager'
import Navbar from './components/navbar'
import Footer from './components/Footer'

function App() {
  
  return (
    <>
    <Navbar/>
    {/* <div className='min-h-[87vh]'> */}
   <div className='bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px)] bg-[size:14px_24px]'>
    <Manager/>
    {/* </div> */}
    </div>
    <Footer/>
    </>
  )
}

export default App