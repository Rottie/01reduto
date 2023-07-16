import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTutorial } from "../../slices/tutorials";
//TextField, Button, Container, and Grid are components 
//from the Material-UI library used for building the user interface.
import { TextField, Button, Container, Grid } from "@mui/material";

const AddTutorial = () => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    const { title, description } = tutorial;

    dispatch(createTutorial({ title, description }))
      .unwrap()
      .then((data) => {
        console.log(data);
        setTutorial({
          id: data.id,
          title: data.title,
          description: data.description,
          published: data.published
        });
        setSubmitted(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  return (
    // <Container> is a component from a UI library Material-UI 
    //that provides a container with a maximum width.
    //maxWidth="sm" prop limits the container's maximum width 
    //to the "small" breakpoint size.
    <Container maxWidth="sm">
      {/* a ternary operator that checks the value of submitted.
      */}
      {submitted ? (
//If submitted is true, it displays a success message and an "Add" button inside a <div>.
        <div>
          <h4>You submitted successfully!</h4>
          <Button variant="contained" color="success" onClick={newTutorial}>
            Add
          </Button>
        </div>
      ) : (
//If submitted is false, it displays the form elements 
//for entering the tutorial title and description
// inside a <Grid> container. 
        <Grid container spacing={2}>
  {/* <Grid> is a Material-UI component used to create responsive grid layouts.
  container indicates that it's a container grid that can hold grid items.
  spacing={2} sets the spacing between the grid items to 2 units.
  */}
          <Grid item xs={12}>
  {/* <Grid item> represents a single item within the grid.
  xs={12} means the item will occupy the full width of the container (12 columns) on small screens. On 
  larger screens, it will adjust its size automatically.
  */}


  {/*<TextField> is a Material-UI component used to create input field  */}
            <TextField
  // label="Title" sets the label for the input field as "Title."
              label="Title"
  //variant="outlined" gives the input field an outlined appearance.
              variant="outlined"
  //fullWidth makes the input field occupy the full width of its container.
              fullWidth
  //required sets the field as required, prompting the user to enter a value before submitting the form.
              required
  //value={tutorial.title} binds the value of the input field to the title property of the tutorial state.
              value={tutorial.title}
  //onChange={handleInputChange} assigns the handleInputChange function as the 
  //event handler to handle changes in the input field value.
              onChange={handleInputChange}
  //name="title" sets the name attribute of the input field to "title."
              name="title"
            />

          </Grid>



          <Grid item xs={12}>
    {/*<TextField> component is similar to the previous one but used for entering the tutorial description.  */}
            <TextField
    // /label="Description" sets the label for the input field as "Description."
              label="Description"
              variant="outlined"
              fullWidth
              required
    //multiline allows the user to enter multiple lines of text.
              multiline
    //rows={4} sets the number of rows (lines) visible in the input field.
              rows={4}
      
              value={tutorial.description}
              onChange={handleInputChange}
              name="description"
            />
          </Grid>
          <Grid item xs={12}>
    {/* <Button> is a Material-UI component used to create buttons.
    variant="contained" sets the button style to "contained," meaning it has a background color.
    color="success" sets the button color to the "success" color from the theme palette.
    onClick={saveTutorial} assigns the saveTutorial function as the event handler when the button is clicked
    */}
            <Button variant="contained" color="success" onClick={saveTutorial}>
              Submit
            </Button>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default AddTutorial;
