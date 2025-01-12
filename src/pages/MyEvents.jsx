// pages/MyEvents.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import Navbar from '../components/Navbar'; // Adjust the import path as necessary

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = Cookies.get('access_token');
        if (!token) {
          throw new Error('No access token found');
        }
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user_id; // Adjust based on your token structure

        const response = await axios.post('http://localhost:8080/events/user', { userId }, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        setEvents(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch events. Please try again.');
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold text-teal-500 mb-4">My Events</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className='bg-teal-500 text-white'> 
              <tr>
                <th className="py-2 px-4 border-b">Event Name</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Tickets</th>
                <th className="py-2 px-4 border-b">Type</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id}>
                  <td className="py-2 px-4 border-b">{event.name}</td>
                  <td className="py-2 px-4 border-b">{event.description}</td>
                  <td className="py-2 px-4 border-b">{event.price}Dh</td>
                  <td className="py-2 px-4 border-b">{event.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyEvents;