import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { updateEvent, getEventById } from '../services/eventService'; // Adjust the import path as necessary
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const UpdateEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({ name: '', description: '', type: '', addressId: '', price: '' });
  const [tickets, setTickets] = useState([{ quantity: '' }]);
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(id);
        setEvent({
          name: eventData.name,
          description: eventData.description,
          type: eventData.type,
          addressId: eventData.addressId,
          price: eventData.price,
        });
        setTickets(eventData.tickets || [{ quantity: '' }]);
      } catch (err) {
        console.error('Failed to fetch event:', err);
        setError('Failed to fetch event');
      }
    };

    const fetchAddresses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/addresses', { withCredentials: true });
        setAddresses(response.data);
      } catch (err) {
        console.error('Failed to fetch addresses:', err);
        setError('Failed to fetch addresses');
      }
    };

    fetchEvent();
    fetchAddresses();
  }, [id]);

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
    setTickets([...tickets, { quantity: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get('access_token');
      if (!token) {
        throw new Error('No access token found');
      }
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user_id; // Adjust based on your token structure

      await updateEvent(id, { ...event, tickets, uid: userId });
      // Redirect or show success message
      alert('Event updated successfully!');
    } catch (err) {
      setError('Failed to update event');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-teal-500 mb-4">Update Event</h2>
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
            <select
              name="addressId"
              value={event.addressId}
              onChange={handleEventChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select Address</option>
              {addresses.map(address => (
                <option key={address.id} value={address.id}>
                  {address.street}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="price"
              value={event.price}
              onChange={handleEventChange}
              placeholder="Ticket Price"
              required
              className="w-full p-2 border rounded"
            />

            <h2 className="text-xl font-bold text-teal-500 mb-2">Update Tickets</h2>
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
              Update Event and Tickets
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateEvent;