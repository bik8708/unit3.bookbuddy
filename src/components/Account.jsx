/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import React, { useState, useEffect } from "react";
import axios from "axios";
import ReturnBook from "./ReturnBook";

function Account({ user, token }) {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/reservations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .then((result) => {
        console.log(result);
        setBorrowedBooks(result);
      })
      .catch(console.error);
  }, []);

  return (
    <div style={{ margin: "40px" }}>
      <h2>
        Welcome Back, {user?.firstname} {user?.lastname}!
      </h2>
      <div>
        <h3>Books you've borrowed from Book Buddy:</h3>
        {borrowedBooks?.reservation && borrowedBooks.reservation.length > 0 ? (
          <div>
            {borrowedBooks.reservation.map((borrowedBook) => (
              <div
                key={borrowedBook.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <p>{borrowedBook.title}</p>
                <p>Reservation#: {borrowedBook.id}</p>
                <ReturnBook borrowedBook={borrowedBook} token={token} />
              </div>
            ))}
          </div>
        ) : (
          <p>You have no books borrowed at this time.</p>
        )}
      </div>
    </div>
  );
}

export default Account;

//useeffect - users.me token and take it out of app jsx

//do the same thing as books but filter for those that are not available
