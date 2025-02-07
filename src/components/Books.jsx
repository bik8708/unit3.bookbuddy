/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import React, { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import Login from "./Login";
import axios from "axios";
import CheckOutBook from "./CheckOutBook";

function Books({ token }) {
  const [allBooks, setAllBooks] = useState([]);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [sortBooks, setSortBooks] = useState(false);
  const [searchText, setSearchText] = useState("");

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
      <div>
        <h2>Our selection of books:</h2>
        <nav>
          <button onClick={() => setShowOnlyAvailable(true)}>
            Show available books only
          </button>
          <button onClick={() => setShowOnlyAvailable(false)}>
            All books at Book Buddy
          </button>
          <button onClick={() => setSortBooks(true)}>Sort by A - Z</button>
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by Title"
          />
        </nav>
      </div>

      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {allBooks
          .filter((book) => (showOnlyAvailable ? book.available : true))
          .filter((book) => {
            if (!searchText) return true;
            return book.title.toLowerCase().includes(searchText.toLowerCase());
          })
          .sort((a, b) => (sortBooks ? a.title.localeCompare(b.title) : null))
          .map((book) => (
            <div key={book.id} className="bookcards">
              <Link
                to={`/books/${book.id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  width: "100%",
                }}
              >
                <p>
                  <strong>{book.title}</strong>
                </p>
                <p>by: {book.author}</p>
                <img
                  src={book.coverimage}
                  alt={book.title}
                  style={{
                    display: "block",
                    width: "100%",
                    maxHeight: "280px",
                  }}
                />
              </Link>

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
                  <CheckOutBook
                    book={book}
                    token={token}
                    setAllBooks={setAllBooks}
                    allBooks={allBooks}
                  />
                ) : token ? (
                  "Sorry, this book is not available right now. Contact to find wait times."
                ) : null}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Books;
