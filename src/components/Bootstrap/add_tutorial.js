import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTutorial } from "../../slices/tutorials";

// imports necessary components from the React Bootstrap library, including Form, Button, Container, Row, and Col.
//React Bootstrap provides pre-styled components that make it easier to build responsive and visually appealing UIs in React applications.
import { Form, Button, Container, Row, Col } from "react-bootstrap";

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

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    const { title, description } = tutorial;

    dispatch(createTutorial({ title, description }))
      .unwrap()
      .then(data => {
        console.log(data);
        setTutorial({
          id: data.id,
          title: data.title,
          description: data.description,
          published: data.published
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  return (
  //<Container> is a React Bootstrap component that provides a container with a fixed or fluid width,
  // depending on the screen size.
    <Container>
  {/* <Row> is a React Bootstrap component used to create a row to hold columns.
  className="submit-form" sets the CSS class of the row to "submit-form," which might be used for styling purposes.
  */}
      <Row className="submit-form">
    {/*<Col> is a React Bootstrap component used to create columns within a row.
    md={{ span: 6, offset: 3 }} specifies column layout settings for medium-sized screens (md breakpoints).
    span: 6 means the column will occupy 6 out of 12 available columns, which takes up half of the available width.
    offset: 3 means the column will be offset by 3 columns, creating a centered column.
    */}
        <Col md={{ span: 6, offset: 3 }}>
  {/* a ternary operator that checks if submitted is true. 
   If it is, it will render the content inside the first parentheses
   otherwise, it will render the content inside the second parentheses.
  */}
          {submitted ? (
  //  content that will be rendered if submitted is true.
 //renders a <div> element with an <h4> heading saying "You submitted successfully!" and a <Button> with the text "Add" and a variant set to "success."
 //<Button> is clickable and calls the newTutorial function when clicked.
            <div>
              <h4>You submitted successfully!</h4>
              <Button variant="success" onClick={newTutorial}>
                Add
              </Button>
            </div>
          ) : (
// content that will be rendered if submitted is false.
            <div>
{/* renders a <div> element containing a <Form> */}
              <Form>
{/* <Form.Group> is a React Bootstrap component used to group form controls together.
controlId="title" associates the form group with the input field for accessibility purposes.
*/}
                <Form.Group controlId="title">
{/* <Form.Label> is used to provide a label for the input field.
 */}
                  <Form.Label>Title</Form.Label>
{/* <Form.Control> is a React Bootstrap component used to create form controls. */}
                  <Form.Control
            //  specifies the input type as text.
                    type="text"
            // indicates that the input is required.
                    required
          //binds the value of the input field to the title property of the tutorial object
          // If tutorial.title is falsy (e.g., null or undefined), it will set the value to an empty string.
                    value={tutorial.title || ""}
          //assigns the handleInputChange function as the event handler to handle changes in the input field value.
                    onChange={handleInputChange}
          // sets the name attribute of the input field to "title."
                    name="title"
                  />
                </Form.Group>


{/*  renders a form group with a label "Description" and an input field for the description.
*/}
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={tutorial.description || ""}
                    onChange={handleInputChange}
                    name="description"
                  />
                </Form.Group>

{/*<Button> is a React Bootstrap component used to create buttons. 
variant="success" sets the button style to "success," which gives it a green color.
onClick={saveTutorial} assigns the saveTutorial function as the event handler when the button is clicked.
button displays the text "Submit" as its content.
*/}
                <Button variant="success" onClick={saveTutorial}>
                  Submit
                </Button>
              </Form>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AddTutorial;
