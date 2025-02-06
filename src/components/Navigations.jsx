/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */

import React from "react";
import { Link } from "react-router-dom";

function Navigations({ token, setToken }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };
  return (
    <div>
      <header
        id="navbar"
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "20px",
          margin: "40px",
        }}
      >
        <Link to="/books">Home</Link>
        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        {token && <Link to="/account">Account</Link>}
        {token && <button onClick={handleLogout}>Logout </button>}
      </header>
    </div>
  );
}

export default Navigations;

//passed user into nav as a bar
// user && <></>
