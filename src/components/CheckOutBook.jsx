import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Books from "./Books";

function CheckOutBook({ user, token, book, setAllBooks, allBooks }) {
  const [borrowBook, setBorrowBook] = useState(null);
  const [message, setMessage] = useState("");

  function handleClick() {
    axios
      .patch(
        `${import.meta.env.VITE_API_BASE_URL}/books/${book.id}`,
        {
          available: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      .then((response) => {
        const status = response.status;
        return { data: response.data, status };
      })
      .then(({ data, status }) => {
        axios(`${import.meta.env.VITE_API_BASE_URL}/books`)
          .then((response) => {
            console.log(response.data);
            setAllBooks(response.data.books);
            console.log(response.data.books);
          })
          .catch((err) => console.error(err));
      })
      .catch(console.error);
    setMessage("Success! It's officially yours to read.");
  }

  return (
    <div>
      {token && <button onClick={handleClick}> Borrow Book</button>}
      {message && <p>{message}</p>}
    </div>
  );
}

export default CheckOutBook;
