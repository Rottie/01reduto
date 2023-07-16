// imports an object called http from a module located in the parent directory with the name http-common.
//Pros: Allow change baseUrl easily,prevent code redundancy
import http from "../http-common";

//defines a function named getAll using an arrow function syntax.
// does not take any argument
const getAll = () => {
  // used to retrieve all tutorials by making a GET request to the specified endpoint /tutorials.
  return http.get("/tutorials");
};

//defines a function named get that takes an id as an argument.
//id parameter will be dynamically substituted in the URL.
const get = id => {
  //used to retrieve a specific tutorial by making a GET request to the endpoint /tutorials/${id}. 
  return http.get(`/tutorials/${id}`);
};

//defines a function named create that takes data as an argument
const create = data => {
  // used to create a new tutorial by making a POST request to the endpoint /tutorials with the provided data as the request payload
  return http.post("/tutorials", data);
};

//defines a function named update that takes an id and data as arguments. 
const update = (id, data) => {
  // used to update an existing tutorial by making a PUT request to the endpoint /tutorials/${id} with the provided data as the updated request payload.
  return http.put(`/tutorials/${id}`, data);
};

//defines a function named remove that takes an id as an argument.
const remove = id => {
  // /used to delete a specific tutorial by making a DELETE request to the endpoint /tutorials/${id}.
  return http.delete(`/tutorials/${id}`);
};

//defines a function named removeAll without any arguments.
const removeAll = () => {
  //used to delete all tutorials by making a DELETE request to the endpoint /tutorials.
  return http.delete(`/tutorials`);
};

//defines a function named findByTitle that takes a title as an argument.
//The title parameter will be dynamically added to the URL as a query parameter.
const findByTitle = title => {
  // used to search for tutorials by title by making a GET request to the endpoint /tutorials?title=${title}
  return http.get(`/tutorials?title=${title}`);
};

//creates an object named TutorialService that holds all the functions defined above.
const TutorialService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

//exports the TutorialService object as the default export of this module
//llows other parts of the application to import and use the TutorialService object to interact with the server's API conveniently.
export default TutorialService;