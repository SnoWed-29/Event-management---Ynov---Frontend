import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';
import { getEvents } from '../services/eventService'; // Adjust the import path as necessary
import image1 from '../assets/images/image1.jpg'
function Event() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        setError('Failed to fetch events');
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-2 gap-4 w-9/12 mx-auto p-2">
        {error && <p className="text-red-500">{error}</p>}
        {events.map(event => (
          <EventCard
            key={event.id}
            name={event.name}
            image={image1} 
            price={event.price} // added the price in the Db
            description={event.description}
            id={event.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Event;