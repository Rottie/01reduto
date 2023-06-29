
import './App.css';
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


import AddTutorial from "./components/tutorials/add_tutorial";
import Tutorial from "./components/tutorials/tutorial";
import TutorialsList from "./components/tutorials/tutorial_list";

function App() {
  return (
    <Router>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <Link to={"/tutorials"} className="navbar-brand">
        bezKoder
      </Link>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={"/tutorials"} className="nav-link">
            Tutorials
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/add"} className="nav-link">
            Add
          </Link>
        </li>
      </div>
    </nav>

    <div className="container mt-3">
      <Routes>
        <Route path="/" element={<TutorialsList/>} />
        <Route path="/tutorials" element={<TutorialsList/>} />
        <Route path="/add" element={<AddTutorial/>} />
        <Route path="/tutorials/:id" element={<Tutorial/>} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
