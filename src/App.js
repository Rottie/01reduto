
//imports the React library, which is required to use JSX (JavaScript XML) syntax and other React-related functionalities.
import React from "react";
// imports several components from the react-router-dom library.
//. The components include BrowserRouter, Routes, Route, and Link. These components are used for setting up client-side routing in the application.
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// imports the Bootstrap CSS file, which applies Bootstrap's styling to the application
import "bootstrap/dist/css/bootstrap.min.css";
//imports a custom CSS file named App.css. This file contains additional custom styles specific to this application.
import './App.css';


//New tuto,tuo list,tuto componenst(pure html,material ui,react bootstrap)

// import AddTutorial from "./components/tutorials/add_tutorial";
// import AddTutorial from "./components/Material/add_tutorial";
import AddTutorial from "./components/Bootstrap/add_tutorial";
// import Tutorial from "./components/tutorials/tutorial";
// import Tutorial from "./components/Material/tutorial";
import Tutorial from "./components/Bootstrap/tutorial";
// import TutorialsList from "./components/tutorials/tutorial_list";
// import TutorialsList from "./components/Material/tutorial_list";
import TutorialsList from "./components/Bootstrap/tutorial_list";

// defines the main App component of the application

function App() {
  ////a functional component that returns the UI for the entire application.
  return (
    //wraps the entire application inside the Router component. 
    // The Router component is provided by react-router-dom and enables client-side routing in the application.
    <Router>
    
    {/*  defines the navigation bar of the application, styled with Bootstrap classes. 
    
    */}
    
    
    <nav className="navbar navbar-expand navbar-dark bg-dark">
     
     {/*reates a Link component using the react-router-dom library.
      It represents a link to the tutorials list page (/tutorials)
     The text "bezKoder" will be displayed as a clickable link. */}
      <Link to={"/tutorials"} className="navbar-brand">
        bezKoder
      </Link>

     {/* This <div> contains the navigation links in the navigation bar. */}
      <div className="navbar-nav mr-auto">
      {/* contains two links: one for navigating to the list of tutorials (/tutorials) 
       creates a list item (<li>) that holds a navigation link.
      */}
       
        <li className="nav-item">
          {/* creates a Link component representing a link to the tutorials list page (/tutorials).
         e text "Tutorials" will be displayed as a clickable link.
         */}
          <Link to={"/tutorials"} className="nav-link">
            Tutorials
          </Link>
        </li>

      {/* and another for adding a new tutorial (/add).
      creates another list item (<li>) that holds another navigation link.
      */}
        <li className="nav-item">
          {/*  creates a Link component representing a link to the add tutorial page (/add). 
           text "Add" will be displayed as a clickable link.
          */}
          <Link to={"/add"} className="nav-link">
            Add
          </Link>
        </li>
      </div>



    </nav>

{/* <div> with the container and mt-3 classes contains the content of the application. */}
    <div className="container mt-3">
     {/* sets up the routes for the application. 
     contains multiple <Route> components representing different routes and their corresponding components
      */}
      <Routes>
        {/* Route> component represents the root route (
          en the URL path matches /, it will render the TutorialsList component.
          */}
        <Route path="/" element={<TutorialsList/>} />
        <Route path="/tutorials" element={<TutorialsList/>} />
        <Route path="/add" element={<AddTutorial/>} />
        <Route path="/tutorials/:id" element={<Tutorial/>} />
      </Routes>
    </div>
  </Router>
  );
}

//exports the App component as the default export of this module
//allows other parts of the application to import and use the App componen
//application will start by rendering the App component as the root of the entire UI tree.
export default App;
