/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import React, { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import Login from "./Login";
import axios from "axios";
import CheckOutBook from "./CheckOutBook";

function Books({ token }) {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    axios(`${import.meta.env.VITE_API_BASE_URL}/books`)
      // axios("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books")
      .then((response) => {
        console.log(response.data);
        setAllBooks(response.data.books);
        console.log(response.data.books);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Our selection of books:
      </h2>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {allBooks.map((book) => (
          <div
            key={book.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px",
              width: "300px",
              boxSizing: "border-box",
              textAlign: "center",
            }}
          >
            <Link to={`/books/${book.id}`}>
              <strong>{book.title}</strong>
            </Link>
            <p>by: {book.author}</p>
            <img
              src={book.coverimage}
              alt={book.title}
              style={{
                display: "block",
                width: "100%",
                maxHeight: "250px",
                aspectRatio: "16 / 9",
                objectFit: "cover",
                objectPosition: "center",
              }}
            ></img>
            <p style={{ fontSize: "12px" }}>
              Available: {book.available ? "Yes" : "No"}
            </p>
            <div
              style={{
                textAlign: "center",
                fontSize: "14px",
                fontStyle: "italic",
              }}
            >
              {book.available ? (
                <CheckOutBook book={book} token={token} />
              ) : (
                "Sorry, this book is not available to borrow right now. Contact our team to find wait times"
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
