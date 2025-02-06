import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ReturnBook({ token, borrowedBook }) {
  const [returnBook, setReturnBook] = useState(null);
  const [message, setMessage] = useState("");

  async function handleClick() {
    await axios
      .delete(
        `${import.meta.env.VITE_API_BASE_URL}/reservations/${borrowedBook.id}`, //NEED TO FIX
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => response.data)
      .then((result) => {
        console.log(result);
        setReturnBook(result);
        console.log(setReturnBook);
      })
      .catch(console.error);
    setMessage("Book returned successfully!");
    // if {book.available === true}}
  }

  return (
    <div>
      <button onClick={handleClick}> Return Book</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ReturnBook;
