import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { updateTutorial, deleteTutorial } from "../../slices/tutorials";
import TutorialDataService from "../../services/TutorialService";

// imports necessary components from the Material-UI library, including Container, Typography, TextField, Button, FormControlLabel, Switch, and Grid.
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Grid,
} from "@mui/material";

const Tutorial = () => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getTutorial = id => {
    TutorialDataService.get(id)
      .then(response => {
        setCurrentTutorial(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getTutorial(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

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
  //<Container> is a Material-UI component that provides a container with a maximum width. 
  //The maxWidth="md" prop sets the maximum width to "md" breakpoint size.
    <Container maxWidth="md">
 {/*  ternary operator that checks if currentTutorial is truthy
  If it is, it will render the content inside the first parentheses;
   otherwise, it will render the content inside the second parentheses.
 */}
      {currentTutorial ? (
  // <Grid> is a Material-UI component used to create responsive grid layouts
  //container indicates that it's a container grid that can hold grid items.
  //spacing={2} sets the spacing between the grid items to 2 units.
        <Grid container spacing={2}>
 {/*<Grid item> represents a single item within the grid.
 xs={12} means the item will occupy the full width of the container (12 columns) on small screens. On 
  larger screens, it will adjust its size automatically.
 */}
          <Grid item xs={12}>
{/* <Typography> is a Material-UI component used to display text with different variants (styles).
variant="h4" sets the text variant to "h4," which represents a heading level 4.
It displays the text "Tutorial" as a heading.
*/}
            <Typography variant="h4">Tutorial</Typography>
     {/* <form> element that wraps the input fields */}
            <form>
        {/* <TextField> is a Material-UI component used to create input fields. */}
              <TextField
        //makes the input field occupy the full width of its container.
                fullWidth
        //gives the input field an outlined appearance.
                variant="outlined"
        //sets the label for the input field as "Title."
                label="Title"
        //sets the name attribute of the input field to "title."
                name="title"
        // binds the value of the input field to the title 
        //property of the currentTutorial object.
                value={currentTutorial.title}
        // assigns the handleInputChange function as the event handler 
        //to handle changes in the input field value.
                onChange={handleInputChange}
              />
        {/* <TextField> component is similar to the previous
         one but used for entering the tutorial description.
         */}
              <TextField
                fullWidth
                variant="outlined"
        //  sets the label for the input field as "Description."
                label="Description"
        // sets the name attribute of the input field to "description."
                name="description"
        //binds the value of the input field to the description
        // property of the currentTutorial object.
                value={currentTutorial.description}
                onChange={handleInputChange}
              />
        
        {/*  a Material-UI component used to create 
        a label associated with a form control element. */}
              <FormControlLabel
          // used here to create a label for the <Switch> component.
          //control prop accepts the <Switch> component, and the label prop sets the label text to "Publish."   
          control={
                  <Switch
            // checked prop of the <Switch> is set to the value of currentTutorial.published,
            //determines whether the switch is toggled on or off based on the published property of the currentTutorial object.
                    checked={currentTutorial.published}
            //onChange prop assigns an anonymous function as the event handler when the switch is toggled. 
            // function calls the updateStatus function, passing the negation (!) of the current 
            //currentTutorial.published value as the argument. 
            onChange={() => updateStatus(!currentTutorial.published)}
                  />
                }
                label="Publish"
              />
            </form>
        {/* <Button> is a Material-UI component used to create buttons. */}
            <Button
        //  sets the button style to "contained," meaning it has a background color.
              variant="contained"
        // sets the button color to the primary color from the theme palette.
              color="primary"
              onClick={updateContent}
        // assigns the updateContent function as the event handler when the button is clicked.
              style={{ marginRight: "10px" }}
      //displays the text "Update" as its content.
            >
              Update
            </Button>

    {/*<Button> component, this time with the color set to 
    "secondary" (for a color associated with deletions).  */}
            <Button
              variant="contained"
              color="secondary"
    //  assigns the removeTutorial function as 
    //the event handler when the button is clicked.
              onClick={removeTutorial}
              style={{ marginRight: "10px" }}
    //button displays the text "Delete" as its content.
            >
              Delete
            </Button>
    {/* Renders a paragraph element (<p>) with the
     text content from the message variable. */}
            <p>{message}</p>
          </Grid>
        </Grid>
      ) : (

        
//  renders a <Typography> component with the variant set to 
//"body1" if condition inside the parentheses is false

//<Typography> is a Material-UI component used to display text with different variants (styles).
//variant="body1" sets the text variant to "body1," which represents regular body text style.
//The text "Please click on a Tutorial..." is the content of the <Typography> component.
<Typography variant="body1">
          Please click on a Tutorial...
        </Typography>
      )}
    </Container>
  );
};

export default Tutorial;