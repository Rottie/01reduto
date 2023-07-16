//imports the React object and the useState, useEffect, and useCallback hooks.
//
import React, { useState, useEffect, useCallback } from "react";

//imports the useDispatch and useSelector hooks from the react-redux library.
//useDispatch hook is used to dispatch actions to the Redux store, 
// the useSelector hook is used to access the Redux state.
import { useDispatch, useSelector } from "react-redux";
// imports the asynchronous action creators (retrieveTutorials, findTutorialsByTitle, 
//deleteAllTutorials) from the tutorials slice. 
//These actions are used to interact with the Redux store.
import {
  retrieveTutorials,
  findTutorialsByTitle,
  deleteAllTutorials,
} from "../../slices/tutorials";

//imports the Link component from the react-router-dom library. 
//The Link component is used to create links for client-side navigation in a React application.
import { Link } from "react-router-dom";

// imports a custom CSS file named tutorials.css.
// This file contains custom styles specific to this component.
import "./tutorials.css"; 

//defines the TutorialsList functional component.
const TutorialsList = () => {


  //declares a state variable currentTutorial using the useState hook
 // It is initialized with null and will be used to store the currently selected tutorial.
  const [currentTutorial, setCurrentTutorial] = useState(null);


  //declares another state variable currentIndex using the useState hook. 
  // initialized with -1 and will be used to keep track
  // of the index of the currently selected tutorial in the tutorials array.
  const [currentIndex, setCurrentIndex] = useState(-1);


  // declares a state variable searchTitle using the useState hook. 
  //initialized as an empty string and will be used to store the value of the search input field.
  const [searchTitle, setSearchTitle] = useState("");

 //uses the useSelector hook to access the tutorials state from the Redux store.
 //retrieves the tutorials array from the Redux state.
  const tutorials = useSelector(state => state.tutorials);

  //initializes the dispatch variable with the useDispatch hook. 
  //he dispatch function will be used to dispatch Redux actions.
  const dispatch = useDispatch();
  
  //function that handles the change event of the search input field
  const onChangeSearchTitle = e => {
     //extracts  input value field& updates the searchTitle state
    const searchTitle = e.target.value;
      //accordingly using the setSearchTitle function.
    setSearchTitle(searchTitle);
  };

  //a callback function defined using the useCallback hook.
  const initFetch = useCallback(() => {
    //encapsulates the dispatch(retrieveTutorials()) call.
    //The useCallback hook ensures that this function
    // is memoized and doesn't change on re-renders unless 
    //the dispatch dependency changes.
    dispatch(retrieveTutorials());
  }, [dispatch])

  //useEffect hook runs the initFetch function
  // after the component is mounted. 
  useEffect(() => {
    //initFetch function dispatches  retrieveTutorials action
    //, which fetches the tutorials
    // from the backend and updates the Redux state.
    initFetch()
    //The dependency array [initFetch] ensures that 
    // effect runs only once after the initial render.
  }, [initFetch])

  // function is used to reset the currentTutorial & currentIndex 
  //states to their initial values
  //effectively clearing the currently selected tutorial.
  const refreshData = () => {
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  // function is used to set the currentTutorial 
  // currentIndex states based on the tutorial
  // index provided as arguments
  //It is triggered when a tutorial item is clicked, 
  //allowing the user to select a tutorial from the list.
  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

 //function is used to delete all tutorials. 
  const removeAllTutorials = () => {
    //dispatches the deleteAllTutorials action
    // to remove all tutorials from the backend 
    //updates the Redux state accordingly.
    dispatch(deleteAllTutorials())
      .then(response => {
   
        refreshData();
      })
      .catch(e => {
        console.log(e);
      });
  };

  //unction is used to find tutorials by title. 
  //It resets the currentTutorial & currentIndex states 
  const findByTitle = () => {
  //dispatches the findTutorialsByTitle action with the searchTitle
  // as an argument to search for tutorials that
  // match the title entered in the search input field.
    refreshData();
    dispatch(findTutorialsByTitle({ title: searchTitle }));
  };

  
  return (
    // <div> element with class names "list" and "row."
    //serves as a container for the entire content of the component.
    
    <div className="list row">
      {/* another <div> element with the class name "col-md-8." 
      represents a Bootstrap column with a medium (md) size of 8, 
      taking up 8 out of 12 columns in the grid.
      */}
      <div className="col-md-8">
      {/*Bootstrap input group element with the
       class name "input-group" & margin bottom (mb) of 3. 
      groups search input field & "Search" button together.
       */}
        <div className="input-group mb-3">
          {/*  <input> element  */}
          <input
          //  type "text" 
            type="text"
          //  class name "form-control."
          //serves as the search input field
          // is bound to the searchTitle state variable.
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
          
            //When the user types in the input field, 
            // onChangeSearchTitle function is triggered
            // to update the searchTitle state.
            onChange={onChangeSearchTitle}
          />

        {/*  <div> element with the class name "input-group-append.
        used to append elements to the input group
         in this case, the "Search" button
        */}
          <div className="input-group-append">

            {/* <button> element   */}
            <button
            // with class names "btn" & "btn-outline-secondary."
              className="btn btn-outline-secondary"
            //
              type="button"
        //when clicked, it triggers the findByTitle function 
        // /to perform the search based on the entered title.
              onClick={findByTitle}
           // button text is "Searc
            >
              Search
            </button>
          </div>
        </div>
      </div>


    {/* <div> element with the class name "col-md-6."
     represents a Bootstrap column with a medium (md) size of 6, 
     taking up 6 out of 12 columns in the grid.
     */}
      <div className="col-md-6">
    {/* an <h4> heading element displaying the text "Tutorials List." */}
        <h4>Tutorials List</h4>

{/* an unordered list (<ul>) with the class name "list-group." 
    It represents a list of tutorials. */}
        <ul className="list-group">
    {/* a conditional rendering block that checks if
     the tutorials array exists.
    If it does, it maps through each tutorial in the array
    & generates a list item (<li>) for each tutorial.
    */}
          {tutorials &&
            tutorials.map((tutorial, index) => (
//the list item for each tutorial. It has a class name "list-group-item,"
// and if the index matches the currentIndex,
// it also has an "active" class, highlighting the selected tutorial.
//When clicked, the setActiveTutorial function is triggered to set the currentTutorial
// and currentIndex states to the selected tutorial.
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTutorial(tutorial, index)}
                key={index}
              >
                {tutorial.title}
              </li>
            ))}
        </ul>

{/* another <div> element with the class name "list-controls
 It is a container for the "Remove All" button.
*/}
        <div className="list-controls">

{/* a <button> element with class names "btn," "btn-sm" (small size), and "btn-danger" (red color).
 button text is "Remove All
*/}
        <button
          className=" btn btn-sm btn-danger"
  // When clicked, it triggers the removeAllTutorials
  // function to remove all tutorials.
          onClick={removeAllTutorials}
        >
          Remove All
        </button>
        </div>
      </div>





      {/*<div> element with the class name "col-md-6."
      represents a Bootstrap column with a medium (md) size of 6, 
      taking up 6 out of 12 columns in the grid.
      */}
      <div className="col-md-6">
    {/* a conditional rendering block that checks if currentTutorial exists.
     If it does, it displays the details of the selected tutorial.
      If not, it displays a message prompting the user to click on a tutorial.
    */}
        {currentTutorial ? (
          <div>
            <h4>Tutorial</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentTutorial.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentTutorial.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentTutorial.published ? "Published" : "Pending"}
            </div>

  {/* a Link component from react-router-dom.
  creates a link to the URL path "/tutorials/" followed by\
   the id of the current tutorial.
   
  */}
            <Link
              to={"/tutorials/" + currentTutorial.id}
  //   link is displayed as a badge with the class name "badge" and "badge-warning" for styling.
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    </div>
  );
};

//SUmmary UI
//1.renders a list of tutorials with a search bar to filter tutorials by title.
//2. Each tutorial is displayed as a list item, 
//3.and clicking on an item sets it as the currently selected tutorial,
//4. showing its details on the right side. 
//5.The component also includes a "Remove All" button to delete all tutorials,
//6. and an "Edit" link is provided for the selected tutorial,
//7. allowing users to navigate to the edit page for that tutorial.
export default TutorialsList;


//Summary Component
//1.TutorialsList component renders a list of tutorials 
//2.along with a search bar to filter tutorials by title. 
//3.The component interacts with the Redux store 
//4.using the useSelector and useDispatch hooks 
//5.to retrieve and dispatch actions, respectively.
//6.Users can click on a tutorial to view its details, 
//7.and they can also search for tutorials based on the title.
//8.The removeAllTutorials function allows users to delete all tutorials.