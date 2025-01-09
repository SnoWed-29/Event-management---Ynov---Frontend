import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import axios, { Axios } from 'axios';
function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const data = {id: userCredential.user.uid, Email: userCredential.user.email,Name: name}
      const response = axios.post("http://localhost:8080/users", data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer token',
        },
      });
      alert("Registration successful!");
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
          type="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Register
        </button>

        <div className="flex w-full justify-end">
            <a href="/login" className='underline text-sm'>Login</a>
        </div>
      </form>
    </div>
  );
}

export default Register;