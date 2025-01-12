import axios from 'axios';

const API_URL = 'http://localhost:8080/events'; // Adjust the base URL as necessary

// Get all events
const getEvents = async () => {
  try {
    const response = await axios.get(API_URL, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch events:', error);
    throw error;
  }
};

// Get event by ID
const getEventById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch event with ID ${id}:`, error);
    throw error;
  }
};

// Create a new event
const createEvent = async (eventData) => {
  try {
    const response = await axios.post(API_URL, { event: eventData.event, tickets: eventData.tickets }, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Failed to create event:', error);
    throw error;
  }
};

// Update an event
const updateEvent = async (id, eventData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, eventData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(`Failed to update event with ID ${id}:`, error);
    throw error;
  }
};

// Delete an event
const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(`Failed to delete event with ID ${id}:`, error);
    throw error;
  }
};

// Add attendance
const addAttendance = async (attendanceData) => {
  try {
    const response = await axios.post('http://localhost:8080/attend', attendanceData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Failed to add attendance:', error);
    throw error;
  }
};

export { getEvents, getEventById, createEvent, updateEvent, deleteEvent, addAttendance };