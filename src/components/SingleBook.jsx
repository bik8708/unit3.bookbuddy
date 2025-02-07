/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CheckOutBook from "./CheckOutBook";

function SingleBook({ handleClick, token, setAllBooks }) {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios(`${import.meta.env.VITE_API_BASE_URL}/books/${id}`)
      .then((response) => {
        console.log(response.data);
        setBook(response.data.book);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);
  if (loading) {
    return <h3>Loading...</h3>;
  }
  return (
    <div style={{ margin: "40px" }}>
      <h3>{book?.title}</h3>
      <p>{book?.author}</p>
      <p>{book?.description}</p>
      <p>Available to borrow: {book?.available ? "Yes" : "No"}</p>
      <img
        src={book?.coverimage}
        alt={book?.title}
        style={{
          display: "block",
          width: "300px",
          height: "auto",
          margin: "0 auto",
          objectFit: "cover",
          objectPosition: "center",
        }}
      ></img>
      {book.available ? (
        <CheckOutBook book={book} token={token} setAllBooks={setAllBooks} />
      ) : (
        "Sorry, this book is not available to borrow right now."
      )}
    </div>
  );
}

export default SingleBook;
