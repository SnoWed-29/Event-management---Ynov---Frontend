import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { createEvent } from '../services/eventService'; // Adjust the import path as necessary

function CreateEvent() {
  const [event, setEvent] = useState({ name: '', description: '', type: '' });
  const [tickets, setTickets] = useState([{ quantity: '', price: '' }]);
  const [error, setError] = useState('');

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleTicketChange = (index, e) => {
    const { name, value } = e.target;
    const newTickets = [...tickets];
    newTickets[index][name] = value;
    setTickets(newTickets);
  };

  const addTicket = () => {
    setTickets([...tickets, { quantity: '', price: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent({ event, tickets });
      // Redirect or show success message
      alert('Event created successfully!');
    } catch (err) {
      setError('Failed to create event');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-teal-500 mb-4">Create Event</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={event.name}
              onChange={handleEventChange}
              placeholder="Event Name"
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="description"
              value={event.description}
              onChange={handleEventChange}
              placeholder="Event Description"
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="type"
              value={event.type}
              onChange={handleEventChange}
              placeholder="Event Type"
              required
              className="w-full p-2 border rounded"
            />

            <h2 className="text-xl font-bold text-teal-500 mb-2">Create Tickets</h2>
            {tickets.map((ticket, index) => (
              <div key={index} className="space-y-2">
                <input
                  type="number"
                  name="quantity"
                  value={ticket.quantity}
                  onChange={(e) => handleTicketChange(index, e)}
                  placeholder="Ticket Quantity"
                  required
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  name="price"
                  value={ticket.price}
                  onChange={(e) => handleTicketChange(index, e)}
                  placeholder="Ticket Price"
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addTicket}
              className="bg-teal-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-teal-600 transition duration-200"
            >
              Add Ticket
            </button>

            <button
              type="submit"
              className="bg-teal-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-teal-600 transition duration-200"
            >
              Create Event and Tickets
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;