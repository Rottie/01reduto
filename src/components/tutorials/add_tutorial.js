// imports the necessary dependencies from the react library.
//It imports the React object and the useState hook, which allows functional components to manage state.
import React, { useState } from "react";
// imports the useDispatch hook from the react-redux library. The useDispatch hook is used to dispatch actions to the Redux store.
import { useDispatch } from "react-redux";
//imports the createTutorial asynchronous action creator from the tutorials slice.
//The action creator is used to create a new tutorial and update the Redux state.
import { createTutorial } from "../../slices/tutorials";
// imports a custom CSS file named tutorials.css. This file contains custom styles specific to this component.
import "./tutorials.css"; 

//defines the AddTutorial functional component.
const AddTutorial = () => {
  // creates an object named initialTutorialState with properties representing the initial state of the tutorial object. 
  const initialTutorialState = {
    //The initial state includes id (null), title (empty string), description (empty string), and published (false).
    id: null,
    title: "",
    description: "",
    published: false
  };

  //declares a state variable tutorial using the useState hook.
  // It initializes the state with the initialTutorialState object, and the setTutorial function is used to update the state later.
  const [tutorial, setTutorial] = useState(initialTutorialState);
  //declares another state variable submitted using the useState hook
  //It is initialized as false and will be used to track whether the tutorial submission has been successful.
  const [submitted, setSubmitted] = useState(false);

  //This initializes the dispatch variable with the useDispatch hook. 
  //The dispatch function will be used to dispatch Redux actions.
  const dispatch = useDispatch();

  //function that handles the input change event,
  //It is triggered when the user types or selects something in the input fields.
  const handleInputChange = event => {
    // The function extracts the name and value of the input field and updates the tutorial state accordingly using the spread operator.
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  //function handles the saving of the tutorial. 

  const saveTutorial = () => {
     //It extracts the title and description from the tutorial state
    const { title, description } = tutorial;
     // dispatches the createTutorial action using the dispatch function
    dispatch(createTutorial({ title, description }))
    //The unwrap() method is used to get the fulfilled result of the async action 
    .unwrap()
    // .then() and .catch() methods handle the success or error responses, respectively
    
    // If the creation is successful, 
      .then(data => {
        console.log(data);
        //the tutorial state is updated with the response data, 
        setTutorial({
          id: data.id,
          title: data.title,
          description: data.description,
          published: data.published
        });
        //and submitted is set to true.
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

 
  // It is used to reset the form after successful submission.
  const newTutorial = () => {
     // function resets the tutorial state to the initialTutorialState 
    setTutorial(initialTutorialState);
    //and sets submitted to false.
    setSubmitted(false);
  };

  //return statement contains the JSX that will be rendered to the screen
  
  return (

   //<div> element with the class name submit-form
   // wraps the content and provides styling based on the CSS rules associated with the submit-form class.
   <div className="submit-form">
 
   {/*  a conditional rendering statement using JavaScript ternary operator. 
     It checks the value of the submitted state variable
   If submitted is true, the content inside the first parentheses ((...)) will be displayed
   Otherwise, the content inside the second parentheses ((...)) will be displayed.
   
   The submitted state variable determines which part of the content will be displayed based on its value.
   */}
   
    {submitted ? (
      // <div> element that contains the content to be displayed if submitted is true.
      // It includes a success message and a "Add" button.
      <div>
        {/* <h4> heading element displaying the success message "You submitted successfully!". */}
        <h4>You submitted successfully!</h4>
        {/* a button element with class names btn btn-success. 
        The button's label is "Add," and 
        it has an onClick event handler assigned to the newTutorial function.
         Clicking this button will reset the form to its initial state. */}
        <button className="btn btn-success" onClick={newTutorial}>
          Add
        </button>
      </div>
    ) : (
      //  another <div> element that contains the content to be displayed if submitted is false
      //<div> element that wraps the form content.
      <div>
        {/* another <div> element with the class name "form-group". 
        It represents a container that groups form elements together. */}
        <div className="form-group">
          {/* a label element associated with the input field for the tutorial title.  
          htmlFor attribute is set to "title," which connects the label to the input field
           with the matching id attribute
          */}
          
          <label htmlFor="title">Title</label>
         
         {/* an input element   represents
             input field for the tutorial title.
         */}
          <input
          // type "text" 
            type="text"
          //with class name "form-control.
            className="form-control"
            // The id attribute is set to "title" to associate the label with this input field
            id="title"
            //The required attribute indicates that the field must be filled before submitting the form. 
            required
            //The value attribute is bound to the tutorial.title state variable
            // ensuring that the input field's value is in sync with the state
            value={tutorial.title || ''}
            // The onChange event handler is assigned to the handleInputChange function, which updates the tutorial state
            // whenever the user types in the input field.
            onChange={handleInputChange}
            name="title"
          />
        </div>

       {/* another <div> element with the class name "form-group". It represents a container
        that groups form elements together. */}
        <div className="form-group">

          {/* a label element associated with the input field for the tutorial description. 
          The htmlFor attribute is set to "description," which connects the label
           to the input field with the matching id attribute
          */}
          <label htmlFor="description">Description</label>
          
          {/*  an input element represents  input field 
          for the tutorial description.  */}
          <input
          //  type "text"
            type="text"
          //with class name "form-control.
            className="form-control"
        //The id attribute is set to "description"
        // to associate the label with this input field.
            id="description"
        // The required attribute indicates that the field 
        //must be filled before submitting the form. 
            required
        // The value attribute is bound to the tutorial.description state variable, ensuring that 
        //the input field's value is in sync with the state
            value={tutorial.description || ''}
        //onChange event handler is assigned to the handleInputChange function,
        // which updates the tutorial state
        // whenever the user types in the input field.
            onChange={handleInputChange}
            name="description"
          />
        </div>
       
       {/* a button element with
        class names "btn" and "btn-success 
        
        button's label is "Submit," it has aonClick event
         handler assigned to the saveTutorial function.
        Clicking it  trigger the saveTutorial function 
        to create a new tutorial & update the Redux stat
        
        */}
        <button onClick={saveTutorial}
         className="btn btn-success">
          Submit
        </button>
      </div>
    )}
  </div>
  );
};

// 1.renders a form to add a new tutorial.
//2.It includes input fields for the tutorial title and description &a "Submit" button. 
//3.The input fields have associated labels & the form allows users to input  the title and description of the tutorial.
//4.Clicking the "Submit" button triggers the saveTutorial function to create a new tutorial and update the Redux state.

export default AddTutorial;

// Summary
//1.AddTutorial component is a form for adding new tutorials.
//2.It uses local state (tutorial and submitted) to 
//3.manage the form input and submission. 
//4.The handleInputChange function updates the state 
//5.when the user types or selects something in the input fields. 
//6.The saveTutorial function dispatches the createTutorial action 
//7.to add a new tutorial. After successful submission, 
//8.a success message is shown, and
//9. the form is reset when the "Add" button is clicked.