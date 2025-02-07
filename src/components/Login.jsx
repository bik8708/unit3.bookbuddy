/* TODO - add your code to create a functional React component that renders a login form */

import React, { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  console.log(email);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("submitting info");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/login`,
        { email, password }
      );
      console.log(response.data);
      if (response.data.message === "Login successful!") {
        setToken(response.data.token);
        setSuccess(true);
        setError(null);
        setEmail("");
        setPassword("");

        setTimeout(() => navigate("/account"), 1000);
      } else {
        setError(response.data.message || "Registration failed.");
      }
    } catch (err) {
      console.error(err.message);
      setError(err.response?.data?.message || "Something went wrong!");
      setSuccess(false);
    }
  }

  return (
    <div style={{ margin: "40px", padding: "10px" }}>
      <form onSubmit={handleSubmit}>
        <h3> Sign into your Book Buddy account to borrow and return books:</h3>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          type="submit"
          style={{ alignSelf: "center", borderRadius: "5px" }}
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
