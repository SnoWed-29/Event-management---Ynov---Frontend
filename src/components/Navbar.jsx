import React from 'react'

function Navbar() {
  return (
    <nav className='w-full py-1  border-b border-b-teal-500 flex justify-between shadow-xl'>
       <div className="flex w-9/12 mx-auto">
        <div className="flex justify-between w-2/3 ">
                <a href="#" className='py-4 px-2 '><i class="fa-solid fa-house text-teal-500"></i> Home</a>
                <a href="#" className='py-4 px-2 '><i class="fa-solid fa-calendar-days text-teal-500"></i> Events</a>
                <a href="#" className='py-4 px-2 '><i class="fa-solid fa-map-location text-teal-500"></i> Locations</a>
            </div>
            <div className="flex w-1/3  justify-end">
                <a href="#" className='bg-teal-500 rounded-full text-white'><i class="fa-regular fa-user p-4 text-xl"></i></a>
            </div>
       </div>
    </nav>
  )
}

export default Navbar