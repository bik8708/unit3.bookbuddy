import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CheckOutBook({ user, token, book }) {
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
      .then((response) => response.data)
      .then((result) => {
        console.log(result);
      })
      .catch(console.error);
    setMessage("Borrowed Succesfully! It's officially yours to read.");
  }
  // console.log(token);

  return (
    <div>
      {/* {token && <button> Borrow Book</button>} */}
      {token && <button onClick={handleClick}> Borrow Book</button>}
      {message && <p>{message}</p>}
    </div>
  );
}

export default CheckOutBook;
