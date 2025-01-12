import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = { email: email, password: password };
      const response = await axios.post("http://localhost:8080/login", data, { withCredentials: true });
      if (response.status === 201) {
        // Since the cookie is HttpOnly, we cannot access it via JavaScript
        // Instead, we rely on the server to handle authenticated requests
        alert("Login successful!");
      } else {
        setError("Failed to login. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to login. Please try again.");
    }
  };

  return (
    <div className="w-2/5 mx-auto border flex flex-col items-center justify-center p-6 mt-10 shadow-lg rounded-md bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="flex flex-col space-y-4 w-full max-w-md">
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
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Login</button>
      </form>
    </div>
  );
}

export default Login;