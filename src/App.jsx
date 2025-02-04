import { useState } from "react";
import bookLogo from "./assets/books.png";
import { Link, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Books from "./components/Books";

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <h1>Book Buddy Library</h1>
      <div>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/allbooks" element={<Books />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
