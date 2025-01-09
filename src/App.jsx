import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { app, analytics } from './firebase';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

function App() {
  console.log("Firebase App:", app);
  console.log("Firebase Analytics:", analytics);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Register />} />
        <Route path="/" element={<Home />} />
        
      </Routes>
    </Router>
  );
}

export default App;