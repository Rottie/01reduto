import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveTutorials,
  findTutorialsByTitle,
  deleteAllTutorials,
} from "../../slices/tutorials";
import { Link } from "react-router-dom";

// imports necessary components from the React Bootstrap library, including Container, Row, Col, Form, Button, and ListGroup
//React Bootstrap provides pre-styled components that make it easier to build responsive and visually appealing UIs in React applications.
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
} from "react-bootstrap";

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
    // <Container> is a React Bootstrap component that provides a container with a fixed or fluid width, depending on the screen size.
    <Container>
  {/* <Row> is a React Bootstrap component used to create a row to hold columns.
  className="justify-content-center mt-5" sets the CSS classes for the row, which
   centers the content horizontally (justify-content-center) 
  and adds a top margin (mt-5).
  */}
      <Row className="justify-content-center mt-5">
{/* <Col> is a React Bootstrap component used to create columns within a row
md={8} specifies the column layout settings for medium-sized screens (md breakpoints).
md={8} means the column will occupy 8 out of 12 available columns, taking up two-thirds of the available width.
*/}
        <Col md={8}>
{/* <Form> is a React Bootstrap component used to create forms. */}
          <Form>
{/* <Form.Group> is a React Bootstrap component used to group form controls together.
className="mb-3" sets the CSS class for the form group, which adds bottom margin (mb-3) for spacing.
*/}
            <Form.Group className="mb-3">
{/* <Form.Control> is a React Bootstrap component used to create form controls. */}
              <Form.Control
//type="text" specifies the input type as text.
                type="text"
//placeholder="Search by title" sets the placeholder text for the input field.
                placeholder="Search by title"
//value={searchTitle} binds the value of the input field to the searchTitle variable.
                value={searchTitle}
//onChange={onChangeSearchTitle} assigns the onChangeSearchTitle function as the event handler to handle changes in the input field value.
                onChange={onChangeSearchTitle}
              />
            </Form.Group>
{/* <Button> is a React Bootstrap component used to create buttons. */}
            <Button
//  sets the button style to an outlined button with a secondary color.
              variant="outline-secondary"
//assigns the findByTitle function as the event handler when the button is clicked.
              onClick={findByTitle}
//sets the CSS class for the button, which adds right margin (me-2) for spacing.
              className="me-2"
            >
              Search
            </Button>
          </Form>
        </Col>
      </Row>

{/* Creates a new <Row> with a top margin (mt-5) for spacing. */}
      <Row className="mt-5">
{/* Creates a new <Col> with a width of 6 out of 12 columns on medium-sized screens. */}
        <Col md={6}>
{/* Renders an <h4> heading with the text "Tutorials List." */}
          <h4>Tutorials List</h4>
{/* Creates a <ListGroup> component to hold a list of items. */}
          <ListGroup>
{/* uses a conditional (&&) and the map function to iterate 
through the tutorials array and render a list of 
<ListGroup.Item> components for each tutorial. */}
            {tutorials &&
              tutorials.map((tutorial, index) => (
    // Renders a single <ListGroup.Item> component for each tutorial in the tutorials array.
                <ListGroup.Item
    // sets a unique key for each item to help React efficiently update the list when needed.
                  key={index}
    //makes the list item appear clickable and applies some styling.
                  action
    //sets the active state for the current list item based on whether its index matches the currentIndex state.
                  active={index === currentIndex}
    // assigns an inline arrow function as the event handler when the list item is clicked.
    //It calls the setActiveTutorial function with the corresponding tutorial and index as arguments.
                  onClick={() => setActiveTutorial(tutorial, index)}
     //content of the list item is the tutorial.title.    
         >
                  {tutorial.title}
                </ListGroup.Item>
              ))}
          </ListGroup>
{/* <Button> component to remove all tutorials. */}
          <Button
  //  sets the button style to a red color to indicate a dangerous action.
            variant="danger"
  // sets the button size to "small."
            size="sm"
  // sets the CSS class for the button, which adds top margin (mt-3) for spacing.
            className="mt-3"
  //assigns the removeAllTutorials function as the event handler when the button is clicked.
            onClick={removeAllTutorials}
  //button displays the text "Remove All" as its content.
          >
            Remove All
          </Button>
        </Col>

{/* Creates a new <Col> with a width of 6 out of 12 columns on medium-sized screens. */}
        <Col md={6}>
    {/* a ternary operator that checks if currentTutorial is true. 
    If it is, it will render the content inside the first parentheses;
    otherwise, it will render the content inside the second parentheses.
    */}
          {currentTutorial ? (
      //  content that will be rendered if currentTutorial is true.
            <div>
    {/* renders a <div> element with an <h4> heading saying "Tutorial." */}
              <h4>Tutorial</h4>
            
            
              <div>
  {/* Renders a <label> element with the text "Title:".
  Renders the currentTutorial.title as the content after the label
  */}
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentTutorial.title}
              </div>

{/*Renders a <label> element with the text "Description:"
Renders the currentTutorial.description as the content after the label.

*/}
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTutorial.description}
              </div>


{/* Renders a <label> element with the text "Status:"
Renders either "Published" or "Pending" based on the currentTutorial.published value.
*/}
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                
                {currentTutorial.published ? "Published" : "Pending"}
              </div>



{/* Renders a <Link> element from React Router that serves as a button to edit the current tutorial. */}
              <Link
//to={"/tutorials/" + currentTutorial.id} sets the link destination to a dynamic URL based on the currentTutorial.id.
                to={"/tutorials/" + currentTutorial.id}
//sets the CSS classes for the link, which applies button styling with a yellow background (btn-warning) 
//and adds top margin (mt-2) for spacing.
                className="btn btn-warning mt-2"
//link displays the text "Edit" as its content.
              >
                Edit
              </Link>


            </div>

        //  content that will be rendered if currentTutorial is false.
          ) : (

// enders a <div> element with a line break (<br />) and a <p> element containing the text "Please click on a Tutorial...".
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TutorialsList;
