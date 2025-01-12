import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ id, name, image, description, price }) => {
  return (
    <div className="border rounded-lg shadow-lg bg-white overflow-hidden flex flex-col h-full">
      {/* Image Section */}
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      
      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-bold mb-2 text-teal-600">{name}</h2>
        <p className="text-gray-700 mb-4 flex-grow">
          {description.length > 100 ? `${description.substring(0, 100)}...` : description}
        </p>
        
        {/* Footer Section */}
        <div className="mt-auto">
          <div className="text-teal-600 font-semibold mb-2">
            Ticket Price: <span className="font-bold text-teal-500">{price} Dh</span>
          </div>
          <Link
            to={`/events/${id}`}
            className="bg-teal-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-teal-600 transition duration-200 w-full text-center"
          >
            View Event
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;