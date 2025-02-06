import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Books from "./components/Books";
import Account from "./components/Account";
import SingleBook from "./components/SingleBook";
import Register from "./components/Register";
import Navigations from "./components/Navigations";
import { useEffect } from "react";
import axios from "axios";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    localStorage.setItem("token", token);

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/users/me`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("API Response:", response.data);

        if (response.data.id) {
          setUser(response.data);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser(null);
      }
    };

    fetchUser();
  }, [token]);

  // if (loading) {
  //   return <h3>loading...</h3>;
  // }

  useEffect(() => {
    console.log("effect running...");
    const localToken = localStorage.getItem("token");
    if (localToken) {
      setToken(localToken);
    }
  }, []);

  return (
    <>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          // padding: "10px",
        }}
      >
        <img
          src={"/assets/books.png"}
          alt={"logo"}
          style={{ height: "55px", marginLeft: "40px", marginRight: "5px" }}
        />
        <h1
        // style={{
        //   margin: "40px",
        // }}
        >
          Book Buddy Library
        </h1>
        <div>
          <Navigations token={token} setToken={setToken} />
        </div>
      </header>

      <div>
        <Routes>
          <Route path="*" element={<Books />}></Route>
          <Route
            path="/books"
            element={<Books user={user} token={token} />}
          ></Route>
          <Route path="/books/:id" element={<SingleBook />}></Route>
          <Route path="/login" element={<Login setToken={setToken} />}></Route>
          <Route
            path="/register"
            element={<Register setToken={setToken} />}
          ></Route>
          <Route element={<ProtectedRoutes token={token} />}>
            <Route
              path="/account"
              element={<Account user={user} token={token} />}
            ></Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
