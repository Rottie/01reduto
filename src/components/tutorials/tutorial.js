//Imports the necessary hooks from React to use state and effects.
import React, { useState, useEffect } from "react";
//Imports the useDispatch hook from React Redux to dispatch actions to the Redux store.
import { useDispatch } from "react-redux";
//Imports the useParams and useNavigate hooks from React
// Router DOM to access URL parameters and navigate programmatically.
import { useParams, useNavigate } from 'react-router-dom';
//Imports the Redux actions updateTutorial and deleteTutorial from the tutorials slice (Reducer)
// to update and delete tutorial data.
import { updateTutorial, deleteTutorial } from "../../slices/tutorials";
//Imports the TutorialDataService module, presumably a service
// to interact with the server API for tutorials.
import TutorialDataService from "../../services/TutorialService";
// import "./tutorials.css"; // Import the custom CSS file

const Tutorial = (props) => {
  //Uses the useParams hook to extract the id parameter from the URL. 
  //It is used to identify which tutorial to display/edit.
  const { id }= useParams();
  //Uses the useNavigate hook to get a function to 
  //navigate programmatically between different routes.
  let navigate = useNavigate();
//An object representing the initial state of the currentTutorial. It contains 
//id, title, description, and published properties.
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  //A state hook that initializes the currentTutorial state
  // with the initialTutorialState object. 
  // provides a function setCurrentTutorial to update the state.
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  //Another state hook that initializes the message state
  // with an empty string. It will be used to display
  // success or error messages after certain actions.
  const [message, setMessage] = useState("");
//Uses the useDispatch hook to get access to the Redux dispatch function. 
//It is used to dispatch actions to the Redux store.
  const dispatch = useDispatch();
//unction to fetch a specific tutorial using the TutorialDataService service.
//It takes the id parameter and updates the
// currentTutorial state with the fetched tutorial data.
  const getTutorial = id => {
    TutorialDataService.get(id)
      .then(response => {
        setCurrentTutorial(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  //An effect hook that runs when the component mounts
  // or when the id parameter changes. 
  //It calls the getTutorial function to 
  //fetch and set the current tutorial based on id
  // from the URL.
  useEffect(() => {
    if (id)
      getTutorial(id);
  }, [id]);

  // function to handle input changes.
  // It updates the currentTutorial state
  // based on the changes in the input fields.
  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  //function to update published status of  tutorial
  // It dispatches the updateTutorial action with the updated data
  // and updates the currentTutorial state accordingly.
  const updateStatus = status => {
    const data = {
      id: currentTutorial.id,
      title: currentTutorial.title,
      description: currentTutorial.description,
      published: status
    };

  
    dispatch(updateTutorial({ id: currentTutorial.id, data }))
      .unwrap()
      .then(response => {
        console.log(response);
        setCurrentTutorial({ ...currentTutorial, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  //A function to update the entire content
  // (title and description) of the tutorial. 
  //It dispatches the updateTutorial action 
  //with the updated data and shows a success message.
  const updateContent = () => {
    dispatch(updateTutorial({ id: currentTutorial.id, data: currentTutorial }))
      .unwrap()
      .then(response => {
        console.log(response);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  //A function to delete the tutorial.
  //It dispatches the deleteTutorial action & navigates 
  //to the /tutorials page after successful deletion.
  const removeTutorial = () => {
    dispatch(deleteTutorial({ id: currentTutorial.id }))
      .unwrap()
      .then(() => {
        navigate("/tutorials");
      })
      .catch(e => {
        console.log(e);
      });
  };

  
  return (
  // used as the container for the entire content.
    <div>
  {/*conditional statement to check if currentTutorial exists. 
   it does, the code inside the first set of parentheses is executed;
   otherwise, the code inside the second set of parentheses is executed.
  */}
    {currentTutorial ? (
  // <div> element with a CSS class of "edit-form.
  //Used for styling the container of the tutorial editing form.
      <div className="edit-form">
  {/* Displays a level 4 heading "Tutorial."  */}
        <h4>Tutorial</h4>
    {/*<form> element, which contains input fields 
    for updating the tutorial information.  */}
        <form>

  {/* <div> element with a CSS class of "form-group." 
  This class is used for styling the input field container.
  */}

  {/* Title */}
          <div className="form-group">
  {/*Displays a label "Title" associated with
   the input field for the tutorial title.  */}
            <label htmlFor="title">Title</label>
  {/* Renders an input field for the tutorial title. */}
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
      // value attribute is set to currentTutorial.title
      // displays the current title of the tutorial
      value={currentTutorial.title}
     //onChange event is set to handleInputChange,
     // which will be called whenever the user types
     // in the input field to update the state.
              onChange={handleInputChange}
            />
          </div>
    
   {/* Description
   Similarly, the code following is for the input field to update the tutorial description.


   */}
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={currentTutorial.description}
              onChange={handleInputChange}
            />
          </div>

  {/*  <div> element with a CSS class of "form-group" 
    to contain the tutorial's published status. */}
          <div className="form-group">
  {/* Displays a label "Status" with bold styling. */}
            <label>
              <strong>Status:</strong>
            </label>
  {/* A <span> element that conditionally
   applies the class "published" or "pending" to 
   display the status text as "Published" or "Pending" 
  based on the currentTutorial.published property. */}
            <span className={`status ${currentTutorial.published ? "published" : "pending"}`}>

{/* Another conditional statement to check if the tutorial is published. I

*/}
            {currentTutorial.published ? "Published" : "Pending"}
          </span>
          </div>
        </form>
{/* If it is, the code inside the first set of parentheses is executed; 
otherwise, the code inside the second set of parentheses is executed.
 */}
        {currentTutorial.published ? (
// If the tutorial is published, it 
//shows a "UnPublish" button with a primary badge style.
          <button
            className="badge badge-primary mr-2"
//Clicking the button calls the updateStatus 
//function with false to set the published status to false.


            onClick={() => updateStatus(false)}
          >
            UnPublish
          </button>
        ) : (

//  If the tutorial is not published, it 
//shows a "Publish" button with a primary badge style. 
          <button
            className="badge badge-primary mr-2"
// Clicking the button calls the updateStatus function
// with true to set the published status to true
            onClick={() => updateStatus(true)}
          >
            Publish
          </button>
        )}

{/* / Shows a "Delete" button with a danger badge style.
 Clicking the button calls the removeTutorial function
  to delete the tutorial. */}
        <button className="badge badge-danger mr-2" onClick={removeTutorial}>
          Delete
        </button>

{/*Shows an "Update" button with a success badge style. 
 Clicking the button calls the updateContent function 
 to update the tutorial's content.
*/}
        <button
          type="submit"
          className="badge badge-success"
          onClick={updateContent}
        >
          Update
        </button>
{/* Displays the content of the message state. It is used to show success or error messages after certain actions, 
like updating or deleting the tutorial. */}
        <p>{message}</p>
      </div>
    ) : (
// Displays a paragraph containing the message
// "Please click on a Tutorial..." 
// /when no tutorial is selected.
      <div>
        <br />
        <p>Please click on a Tutorial...</p>
      </div>
    )}
  </div>
  );
};

export default Tutorial;

//summary UI flow
//1.Tutorial displaying and editing a specific tutorial's details. 
//2.It uses various hooks and Redux actions to manage the state,
//3.handle input changes, and perform CRUD operations on the tutorial data. 
//4.Additionally, it uses React Router DOM
//5.to access URL parameters and navigate between different pages.