import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateTutorial, deleteTutorial } from "../../slices/tutorials";
import TutorialDataService from "../../services/TutorialService";

//imports necessary components from the React Bootstrap library, including Container, Form, Button, FloatingLabel, Row, and Col
//React Bootstrap provides pre-styled components that make it easier to build responsive and visually appealing UIs in React applications.
import {
  Container,
  Form,
  Button,
  FloatingLabel,
  Row,
  Col,
} from "react-bootstrap";

const Tutorial = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getTutorial = (id) => {
    TutorialDataService.get(id)
      .then((response) => {
        setCurrentTutorial(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getTutorial(id);
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  const updateStatus = (status) => {
    const data = {
      id: currentTutorial.id,
      title: currentTutorial.title,
      description: currentTutorial.description,
      published: status,
    };

    dispatch(updateTutorial({ id: currentTutorial.id, data }))
      .unwrap()
      .then((response) => {
        console.log(response);
        setCurrentTutorial({ ...currentTutorial, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateContent = () => {
    dispatch(updateTutorial({ id: currentTutorial.id, data: currentTutorial }))
      .unwrap()
      .then((response) => {
        console.log(response);
        setMessage("The tutorial was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeTutorial = () => {
    dispatch(deleteTutorial({ id: currentTutorial.id }))
      .unwrap()
      .then(() => {
        navigate("/tutorials");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
// <Container> is a React Bootstrap component that provides a container with a fixed or fluid width, depending on the screen size.
    <Container>
{/* ternary operator that checks if currentTutorial is true.
 If it is, it will render the content inside the first parentheses; 
 otherwise, it will render the content inside the second parentheses.
*/}
      {currentTutorial ? (
  // <Row> is a React Bootstrap component used to create a row to hold columns.
  //className="justify-content-center mt-5" sets the CSS classes for the row, which centers the content horizontally (justify-content-center) and adds a top margin (mt-5) for spacing.
        <Row className="justify-content-center mt-5">
  {/* <Col> is a React Bootstrap component used to create columns within a row.
  md={6} specifies the column layout settings for medium-sized screens (md breakpoints).
  md={6} means the column will occupy 6 out of 12 available columns, taking up half of the available width.
  */}
          <Col md={6}>
  {/* Renders an <h4> heading with the text "Tutorial."
 */}
            <h4>Tutorial</h4>
  {/* <Form> is a React Bootstrap component used to create forms. */}
            <Form>
    {/*<FloatingLabel> is a React Bootstrap component that provides a floating label for form controls. 
    controlId="title" associates the form control with the floating label for accessibility purposes.
   label="Title" sets the text for the floating label.

   */}
              <FloatingLabel controlId="title" label="Title">
{/* <Form.Control> is a React Bootstrap component used to create form controls.
 */}
                <Form.Control
  //  specifies the input type as text.
                  type="text"
  //sets the name attribute of the input field to "title."
                  name="title"
  //binds the value of the input field to the title property of the currentTutorial object.
                  value={currentTutorial.title}
  //assigns the handleInputChange function as the event handler to handle changes in the input field value.
                  onChange={handleInputChange}
                />
              </FloatingLabel>
{/* 
Sure! Let's go through each line of code step by step and explain its purpose:

jsx
Copy code
import {
  Container,
  Form,
  Button,
  FloatingLabel,
  Row,
  Col,
} from "react-bootstrap";
This line imports necessary components from the React Bootstrap library, including Container, Form, Button, FloatingLabel, Row, and Col. React Bootstrap provides pre-styled components that make it easier to build responsive and visually appealing UIs in React applications.
jsx
Copy code
<Container>
<Container> is a React Bootstrap component that provides a container with a fixed or fluid width, depending on the screen size.
jsx
Copy code
{currentTutorial ? (
  // ...
) : (
  // ...
)}
This is a ternary operator that checks if currentTutorial is true. If it is, it will render the content inside the first parentheses; otherwise, it will render the content inside the second parentheses.
jsx
Copy code
<Row className="justify-content-center mt-5">
<Row> is a React Bootstrap component used to create a row to hold columns.
className="justify-content-center mt-5" sets the CSS classes for the row, which centers the content horizontally (justify-content-center) and adds a top margin (mt-5) for spacing.
jsx
Copy code
<Col md={6}>
<Col> is a React Bootstrap component used to create columns within a row.
md={6} specifies the column layout settings for medium-sized screens (md breakpoints).
md={6} means the column will occupy 6 out of 12 available columns, taking up half of the available width.
jsx
Copy code
<h4>Tutorial</h4>
Renders an <h4> heading with the text "Tutorial."
jsx
Copy code
<Form>
<Form> is a React Bootstrap component used to create forms.
jsx
Copy code
<FloatingLabel controlId="title" label="Title">
  <Form.Control
    type="text"
    name="title"
    value={currentTutorial.title}
    onChange={handleInputChange}
  />
</FloatingLabel>
<FloatingLabel> is a React Bootstrap component that provides a floating label for form controls.
controlId="title" associates the form control with the floating label for accessibility purposes.
label="Title" sets the text for the floating label.
<Form.Control> is a React Bootstrap component used to create form controls.
type="text" specifies the input type as text.
name="title" sets the name attribute of the input field to "title."
value={currentTutorial.title} binds the value of the input field to the title property of the currentTutorial object.
onChange={handleInputChange} assigns the handleInputChange function as the event handler to handle changes in the input field value.
jsx
Copy code
<FloatingLabel controlId="description" label="Description">
  <Form.Control
    as="textarea"
    name="description"
    value={currentTutorial.description}
    onChange={handleInputChange}
  />
</FloatingLabel>
Similar to the previous code snippet, but this time using a <textarea> element for the description field. */}
              <FloatingLabel controlId="description" label="Description">
                <Form.Control
            // as="textarea" sets the input field as a textarea.
                  as="textarea"
                  name="description"
                  value={currentTutorial.description}
                  onChange={handleInputChange}
                />
              </FloatingLabel>

 {/*<Form.Check> is a React Bootstrap component used to create form checkboxes and switches.  */}
              <Form.Check
// specifies that we want a switch (a toggle button).
                type="switch"
// sets a unique ID for the switch for accessibility purposes.
                id="published"
// sets the label text for the switch.
                label="Published"
//sets the initial state of the switch based on the published property of the currentTutorial object.
                checked={currentTutorial.published}
// assigns an inline arrow function as the event handler to handle changes in the switch state.
//It calls the updateStatus function with the negation of the current published property.
                onChange={() => updateStatus(!currentTutorial.published)}
              />

{/* <Button> is a React Bootstrap component used to create buttons. */}
              <Button
// sets the button style to the primary color.
                variant="primary"
//assigns the updateContent function as the event handler when the "Update" button is clicked.
                onClick={updateContent}
//sets the CSS classes for the button, adding right margin (me-2) and top margin (mt-2) for spacing.
                className="me-2 mt-2"
//"Update" button displays the text "Update" as its content.
              >
                Update
              </Button>

  {/* similar <Button> is used for the "Delete" button, which calls the 
       removeTutorial function when clicked. */}
              <Button
                variant="danger"
                onClick={removeTutorial}
                className="mt-2"
              >
                Delete
              </Button>
  {/* Renders a <p> element that displays
   the content of the message variable. */}
              <p>{message}</p>
            </Form>
          </Col>
        </Row>

// when there is no selected tutorial (currentTutorial is falsy). It displays the message "Please click on a Tutorial..." in a centered row and column layout, prompting the user to click on a tutorial from the tutorials list.
      ) : (
// creates a new row (<Row>) and applies the CSS classes justify-content-center and mt-5 to the row. 
//justify-content-center class centers the content horizontally, and the mt-5 class adds top margin for spacing.
       <Row className="justify-content-center mt-5">
{/* Inside the row, it creates a new column (<Col>) 
that will occupy 6 out of 12 available columns 
on medium-sized screens (md breakpoints). 
This means it takes up half of the available width. */}
          <Col md={6}>
{/*  Inside the column, it renders a paragraph (<p>) element containing the text "Please click on a Tutorial...".
This message is displayed when there is no currentTutorial, indicating that the user hasn't 
selected any tutorial yet.
*/}
            <p>Please click on a Tutorial...</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Tutorial;
