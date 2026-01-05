import React, { useContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes, Navigate } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login/Login";
import { StoreContext } from "./context/StoreContext";

const App = () => {
  const url = "http://localhost:5000";
  const { token, admin } = useContext(StoreContext);
  const isAuthenticated = token && admin;

  return (
    <div>
      <ToastContainer />
      {isAuthenticated && (
        <>
          <Navbar />
          <hr />
        </>
      )}
      <div className="app-content">
        {isAuthenticated && <Sidebar />}
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/add" /> : <Login url={url}/>}
          />
          <Route
            path="/add"
            element={isAuthenticated ? <Add url={url}/> : <Navigate to="/" />}
          />
          <Route
            path="/list"
            element={isAuthenticated ? <List url={url}/> : <Navigate to="/" />}
          />
          <Route
            path="/orders"
            element={isAuthenticated ? <Orders url={url}/> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
