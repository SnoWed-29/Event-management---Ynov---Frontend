import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { app, analytics } from './firebase';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Events from './pages/Event';
import OneEvent from './pages/OneEvent';
import ProtectedRoute from './routes/ProtectedRoute';
import CreateEvent from './pages/CreateEvent';

function App() {
  console.log("Firebase App:", app);
  console.log("Firebase Analytics:", analytics);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<OneEvent />} />
        <Route path="/create-event" element={<CreateEvent />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/protected-events" element={<Events />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;