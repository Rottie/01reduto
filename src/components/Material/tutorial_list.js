import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveTutorials,
  findTutorialsByTitle,
  deleteAllTutorials,
} from "../../slices/tutorials";

import { Link } from "react-router-dom";

//imports necessary components from the Material-UI library, which provides a UI framework for React applications. 
//imported components are Container, Grid, TextField, Button, List, ListItem, and ListItemText.
import {
  Container,
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const TutorialsList = () => {
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const tutorials = useSelector((state) => state.tutorials);
  const dispatch = useDispatch();

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const initFetch = useCallback(() => {
    dispatch(retrieveTutorials());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const refreshData = () => {
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  const removeAllTutorials = () => {
    dispatch(deleteAllTutorials())
      .then((response) => {
        refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    refreshData();
    dispatch(findTutorialsByTitle({ title: searchTitle }));
  };

  return (
  //<Container> is a Material-UI component that provides a container with a maximum width. 
  // The maxWidth="md" prop sets the maximum width to "md" breakpoint size.
    <Container maxWidth="md">

  {/* <Grid> is a Material-UI component used to create responsive grid layouts
  container indicates that it's a container grid that can hold grid items.
  spacing={2} sets the spacing between the grid items to 2 units.
  */}
      <Grid container spacing={2}>

{/* <Grid item> represents a single item within the grid.
xs={12} means the item will occupy the full width of the container (12 columns) on small screens. 
On larger screens, it will adjust its size automatically.
*/}
        <Grid item xs={12}>
  {/*  <div> element with a CSS class of "input-group mb-3".
  class "input-group" is likely used for styling purposes.
  */}
          <div className="input-group mb-3">
  {/*<TextField> is a Material-UI component used to create input fields.  */}
            <TextField
    //  makes the input field occupy the full width of its container.
              fullWidth
      // gives the input field an outlined appearance.
              variant="outlined"
      //sets the placeholder text for the input field
              placeholder="Search by title"
      //binds the value of the input field to the searchTitle variable
      //value will be displayed in the input field.
              value={searchTitle}
      //assigns the onChangeSearchTitle function as the
      // event handler to handle changes in the input field value.
              onChange={onChangeSearchTitle}
            />
        

        {/* <div> element with a CSS class of "input-group-append"
         class "input-group-append" is likely used for styling purposes.
        */}
            <div className="input-group-append">
        
      {/*<Button> is a Material-UI component used to create button
      variant="outlined" sets the button style to "outlined," meaning it has a border but no background color.
      onClick={findByTitle} assigns the findByTitle function as the event handler when the button is clicked.
      */}
              <Button variant="outlined" onClick={findByTitle}>
                Search
              </Button>
            </div>
          </div>
        </Grid>
    
    {/* <Grid item> that will occupy half of the container's width on small screens. */}
        <Grid item xs={6}>
{/*Renders an <h4> element with the text "Tutorials List".*/}
          <h4>Tutorials List</h4>
{/* <List> is a Material-UI component used to create lists.
component="nav" specifies that the list represents navigation items.
*/}
          <List component="nav">
    
    {/* map() function to render a list of tutorials from the tutorials array.
    
    */}
            {tutorials &&
              tutorials.map((tutorial, index) => (
        // each tutorial in the tutorials array, it creates 
        //a <ListItem> component with the 
        //  tutorial's title as the primary text content.
                <ListItem
              //button prop on <ListItem> makes it clickable.
                  button
              //selected prop is set to true if the index is equal to
              // the currentIndex, which might be used for 
              //highlighting the currently selected item.
                  selected={index === currentIndex}
             //onClick prop assigns the setActiveTutorial function as the event handler when a tutorial item is clicked.
             //setActiveTutorial function seems to be used to set the currently active tutorial in the state based on the clicked item.

                  onClick={() => setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  <ListItemText primary={tutorial.title} />
                </ListItem>
              ))}
          </List>
      
      {/* <Button> component, this time with the variant 
      set to "contained" (solid color button) and 
      the color set to "error" (for a color associated
         with errors or deletions).
       */}
          <Button
            variant="contained"
            color="error"
      // onClick={removeAllTutorials} assigns the removeAllTutorials function 
      //as the event handler when the button is clicked.
            onClick={removeAllTutorials}
            size="small"
            style={{ marginTop: "1rem" }}
          >
            Remove All
          </Button>
        </Grid>

    {/*  <Grid item> that will occupy half of the container's width on small screens. */}
        <Grid item xs={6}>
    {/* a ternary operator that checks if currentTutorial is truthy.
     If it is, it will render the content inside the first parentheses
     otherwise, it will render the content inside the second parentheses.
    */}
          {currentTutorial ? (
            <div>
      {/* Renders an <h4> element with the text "Tutorial". */}
              <h4>Tutorial</h4>

      {/* enders a <div> element with the label
          "Title:" followed by  the title property 
          of the currentTutorial object. */}
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentTutorial.title}
              </div>
{/* renders a <div> element with the label "Description:" followed by 
the description property of the currentTutorial object. */}

              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTutorial.description}
              </div>

{/* renders a <div> element with the label 
"Status:" followed by either "Published" or
 "Pending" based on the published property 
 of the currentTutorial object. */}
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTutorial.published ? "Published" : "Pending"}
              </div>

{/*  renders a <Link> component, which is likely from a React Router or similar routing library.
 */}
              <Link
// to prop sets the link URL to "/tutorials/" followed 
//by the id property of the currentTutorial object.
                to={"/tutorials/" + currentTutorial.id}
//<Link> component is styled with a CSS class of "badge
// badge-warning," which is likely used for styling purposes.
                className="badge badge-warning"
// link displays the text "Edit" as its content.
              >
                Edit
              </Link>
            </div>
          ) : (
// the content that will be rendered if currentTutorial is falsy (e.g., null, undefined, or false).
//renders a <div> element with a line break and a paragraph that says "Please click on a Tutorial..." to prompt the user to select a tutorial.
         <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default TutorialsList;
