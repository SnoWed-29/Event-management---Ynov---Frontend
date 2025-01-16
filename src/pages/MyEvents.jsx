// pages/MyEvents.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import Navbar from '../components/Navbar'; // Adjust the import path as necessary
import Modal from '../components/Modal'; // Adjust the import path as necessary
import { deleteEvent } from '../services/eventService';

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

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
        setError('You have no events');
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteEvent(eventToDelete);
      setEvents(events.filter(event => event.id !== eventToDelete));
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to delete event:', err);
      setError('Failed to delete event. Please try again.');
    }
  };

  const openModal = (id) => {
    setEventToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEventToDelete(null);
  };

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
                <th className="py-2 px-4 border-b">Type</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id}>
                  <td className="py-2 px-4 border-b">{event.name}</td>
                  <td className="py-2 px-4 border-b">{event.description.length > 100 ? `${event.description.substring(0, 100)}...` : event.description}</td>
                  <td className="py-2 px-4 border-b">{event.type}</td>
                  <td className="py-2 px-4 border-b grid grid-cols-3 gap-2">
                    <button
                      onClick={() => openModal(event.id)}
                      className="bg-red-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                    <a
                      href={`/update-event/${event.id}`}
                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-teal-600 transition duration-200" >Edit</a>
                    <a href={`/events/${event.id}`} className="bg-teal-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-teal-600 transition duration-200">View</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this event?"
      />
    </div>
  );
};

export default MyEvents;