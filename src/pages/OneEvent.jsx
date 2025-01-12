import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getEventById, addAttendance } from '../services/eventService'; // Adjust the import path as necessary
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

function OneEvent() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (err) {
        setError('Failed to fetch event');
      }
    };

    fetchEvent();
  }, [id]);

  const handleBuyTicket = async () => {
    try {
      const token = Cookies.get('access_token');
      if (!token) {
        throw new Error('No access token found');
      }
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user_id; // Adjust based on your token structure
      console.log('Sending attendance data:', { userId, eventId: id });
      await addAttendance({ userId, eventId: id });
      alert('Ticket purchased successfully!');
    } catch (err) {
      console.error('Failed to purchase ticket:', err);
      setError('Failed to purchase ticket');
    }
  };

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  if (!event) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:w-1/2">
            <img src={event.image || 'default-image.jpg'} className="object-cover w-full h-full" alt={event.name} />
          </div>
          <div className="md:w-1/2 p-6">
            <h1 className="text-4xl font-bold text-teal-500 mb-4">{event.name}</h1>
            <p className="text-gray-700 mb-6">{event.description}</p>
            <div className="text-lg font-semibold text-teal-600 mb-4">
              Ticket Price: <span className="text-teal-500">{event.price} Dh</span>
            </div>
            <button
              onClick={handleBuyTicket}
              className="inline-block bg-teal-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-teal-600 transition duration-200"
            >
              Buy Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneEvent;