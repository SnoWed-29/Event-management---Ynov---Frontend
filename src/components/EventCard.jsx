import React from 'react';

const EventCard = ({ id, name, description, image, price }) => {
  return (
    <div className="border p-4 rounded shadow-lg bg-white">
      {/* Image Section */}
      <img src={image} alt={name} className="w-full h-48 object-cover rounded-t" />
      
      {/* Content Section */}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <p className="text-gray-700 mb-4">
          {description}
        </p>
        
        {/* Footer Section */}
        <div className="flex justify-between items-center">
          {/* Ticket Price */}
          <div className="text-teal-600 font-semibold">
            Ticket Price: <span className="font-bold text-teal-500">{price}Dh</span>
          </div>
          {/* Button */}
          <a
            href={`/events/${id}`}
            className="bg-teal-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-teal-600 transition duration-200"
          >
            View Event
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventCard;