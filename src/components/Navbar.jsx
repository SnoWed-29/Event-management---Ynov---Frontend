import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8080/logout', {}, { withCredentials: true });
      if (response.status === 200) {
        alert('Logged out successfully');
        navigate('/login'); // Navigate to the login page
      } else {
        alert('Failed to logout');
      }
    } catch (err) {
      console.error('Failed to logout:', err);
      alert('Failed to logout');
    }
  };

  return (
    <nav className='w-full py-1 border-b border-b-teal-500 flex justify-between shadow-xl'>
      <div className="flex w-9/12 mx-auto">
        <div className="flex justify-between w-2/3">
          <a href="/" className='py-4 px-2'><i className="fa-solid fa-house text-teal-500"></i> Home</a>
          <a href="/events" className='py-4 px-2'><i className="fa-solid fa-calendar-days text-teal-500"></i> Events</a>
          <a href="#" className='py-4 px-2'><i className="fa-solid fa-map-location text-teal-500"></i> Locations</a>
        </div>
        <div className="relative flex w-1/3 justify-end">
          <button onClick={toggleDropdown} className='text-teal-500'>
            <i className="fa-regular fa-user px-4 py-3 text-xl hover:bg-black rounded-full"></i>
          </button>
          {dropdownOpen && (
            <div className="absolute top-[40px] right-0 mt-2 w-48 bg-white border border-teal-500 rounded shadow-lg z-50">
              <a href="/my-tickets" className="block px-4 py-2 text-teal-500 hover:bg-teal-100">My Tickets</a>
              <a href="/my-events" className="block px-4 py-2 text-teal-500 hover:bg-teal-100">My Events</a>
              <a href="/create-event" className="block px-4 py-2 text-teal-500 hover:bg-teal-100">Create Event</a>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-teal-500 hover:bg-teal-100">Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;