// pages/UserTickets.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import Navbar from '../components/Navbar'; // Adjust the import path as necessary

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = Cookies.get('access_token');
        if (!token) {
          throw new Error('No access token found');
        }
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user_id; // Adjust based on your token structure

        const response = await axios.post('http://localhost:8080/tickets/user', { userId }, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        console.log('Fetched Tickets:', response.data); // Log the fetched tickets to inspect their structure
        setTickets(response.data);
      } catch (err) {
        console.error('Error fetching tickets:', err);
        setError('Failed to fetch tickets. Please try again.');
      }
    };

    fetchTickets();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold text-teal-500 mb-4">My Tickets</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead className="bg-teal-500 text-white">
              <tr>
                <th className="py-2 px-4 border-b">Ticket ID</th>
                <th className="py-2 px-4 border-b">Event Name</th>
                <th className="py-2 px-4 border-b">Ticket's Price</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(ticket => (
                <tr key={ticket.id} className="hover:bg-teal-100">
                  <td className="py-2 px-4 border-b">{ticket.Ticket.id}</td>
                  <td className="py-2 px-4 border-b">{ticket.Ticket.Event.name}</td>
                  <td className="py-2 px-4 border-b">{ticket.Ticket.Event.price}Dh</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyTickets;