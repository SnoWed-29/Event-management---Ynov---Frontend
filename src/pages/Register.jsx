import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = { email: email, name: name, password: password };
      const response = await axios.post("http://localhost:8080/register", data);
      if (response.status === 201) {
        alert("Registration successful!");
      } else {
        setError("Failed to register. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="w-2/5 mx-auto border flex flex-col items-center justify-center p-6 mt-10 shadow-lg rounded-md bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleRegister} className="flex flex-col space-y-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Register</button>
        <div className="flex w-full justify-end">
            <a href="/login" className='underline text-sm'>Login</a>
        </div>
      </form>
    </div>
  );
}

export default Register;