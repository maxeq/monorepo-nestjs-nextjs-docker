"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const registerUser = async () => {
    const response = await fetch(`http://localhost:3001/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("User registered successfully!");
    } else {
      setMessage(`Failed to register user: ${data.message}`);
    }
  };

  const loginUser = async () => {
    const response = await fetch(`http://localhost:3001/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      setMessage(`${JSON.stringify(data, null, 2)}`);
    } else {
      setMessage(`Failed to register user: ${data.message}`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col justify-start items-center gap-4 max-w-[900px] mx-auto">
      <h1>Registers</h1>
      <div className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={registerUser}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Register
        </button>
        <button
          onClick={loginUser}
          className="p-2 bg-yellow-500 text-white rounded"
        >
          Login
        </button>
      </div>
      <div className="max-w-1/5 justify-center items-center">
        {message && <p>{message.slice(0, 55)}</p>}
      </div>
    </main>
  );
}
