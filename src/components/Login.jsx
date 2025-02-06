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
      // if (response.data.message === "Registration successful") {
      if (response.data.message === "Login successful!") {
        setToken(response.data.token);
        setSuccess(true);
        setError(null);
        setEmail("");
        setPassword("");

        console.log(response.data.id); //delete later
        setTimeout(() => navigate("/account"), 2000);
      } else {
        setError(response.data.message || "Registration failed.");
        console.log(response.data.message); //delete later
      }
    } catch (err) {
      console.error(err.message);
      setError(err.response?.data?.message || "Something went wrong!");
      setSuccess(false);
    }
  }

  //email and password in state

  return (
    <div style={{ margin: "40px", border: "1px solid #ccc", padding: "10px" }}>
      <h3> Sign into your Book Buddy account to borrow and return books:</h3>
      <form onSubmit={handleSubmit}>
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
