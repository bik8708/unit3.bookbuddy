/* TODO - add your code to create a functional React component that renders a registration form */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register({ setToken }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
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
        `${import.meta.env.VITE_API_BASE_URL}/users/register`,
        { firstname, lastname, email, password }
      );
      console.log(response.data);
      if (response.data.message === "Registration successful") {
        setToken(response.data.token);
        setSuccess(true);
        setError(null);

        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");

        setTimeout(() => navigate("/account"), 2000);
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
    <div style={{ margin: "40px", border: "1px solid #ccc", padding: "10px" }}>
      <h3>Registration Form:</h3>

      <p>
        Please complete the registration form below for your Book Buddy Library
        account:
      </p>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <label>
          First Name:
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </label>
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
          Submit Registration
        </button>
      </form>
      {error && <p>Uh oh! Something went wrong..</p>}
      {success && <p>Signed up successfully!</p>}
    </div>
  );
}

export default Register;
