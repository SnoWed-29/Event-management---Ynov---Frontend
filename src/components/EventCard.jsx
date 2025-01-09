import React from 'react';

function EventCard({ name, image }) {
  return (
    <div className="col-span-1 flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden h-auto md:h-64">
      {/* Image Section */}
      <div className="md:w-2/5 w-full h-48 md:h-full">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between px-4 py-3 md:w-3/5">
        {/* Title */}
        <div className="mb-3 border-b border-teal-400 pb-2">
          <h1 className="text-2xl text-teal-500 font-bold">{name}</h1>
        </div>

        {/* Description */}
        <div className="text-gray-700 text-sm mb-4 flex-grow">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque fugiat quod sit
            adipisci sunt, incidunt ex voluptatem vero consequatur non fugit ducimus
            molestias aut debitis. Eum, dolorem.
          </p>
        </div>

        {/* Footer Section */}
        <div>
          {/* Ticket Price */}
          <div className="text-teal-600 font-semibold mb-2">
            Ticket Price: <span className="font-bold text-teal-500">300Dh</span>
          </div>
          {/* Button */}
          <a
            href="#"
            className="block text-center bg-teal-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-teal-600 transition duration-200"
          >
            View Event
          </a>
        </div>
      </div>
    </div>
  );
}

export default EventCard;