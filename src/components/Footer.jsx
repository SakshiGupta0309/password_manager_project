// eslint-disable-next-line no-unused-vars
import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center  bottom-0 w-full p--1  m-1 h-14 '>
      <div className='logo font-bold text-white text-2xl '>
        <span className='text-green-500 '>&lt;</span>
        <span>Pass</span> <span className='text-green-500 '>Op/&gt;<span className='text-white font-bold text-2xl'> created by sakshi</span></span>
      </div>
      {/* <div className='flex justify-center items-center h-1'>created with 
      <img className='w-10 mx-2 ' src='heart.png' alt=' '/>by Sakshi
    
  </div> */}{/*isko isliye comment ki kyuki yeh dikh nhi rha tha*/}
    </div>


    // <div>
    //     <div className='logo font-bold text-white text-2xl'>
    //     <span className='text-green-500'>&lt;</span>

    //     <span>Pass</span> <span className='text-green-500'>Op/&gt;</span></div>
    //     <div> created with <img src='heart.png' alt=''/>by sakshi gupta
    //     </div>
    //      </div>
  )
}

export default Footer

