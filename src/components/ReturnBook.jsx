import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ReturnBook({ token, borrowedBook, book, setBorrowedBooks }) {
  const [returnBook, setReturnBook] = useState(null);
  const [message, setMessage] = useState("");

  async function handleClick() {
    await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}reservations/${borrowedBook.id}`, //NEED TO FIX
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setMessage("Book returned successfully!");

    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/reservations`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTimeout(() => {
      setBorrowedBooks(response.data);
    }, 1000);
  }

  return (
    <div>
      <button onClick={handleClick}> Return Book</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ReturnBook;
