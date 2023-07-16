// imports the Axios library and assigns it to the variable axios
import axios from "axios";

// exports a default object that is created using the axios.create() method.
//allows the configuration of the Axios instance before using it to make HTTP requests.
export default axios.create({
  //any request made through this Axios instance will automatically have this base URL as a prefix
  baseURL: "http://localhost:5000/api",
  //sets the default headers that will be sent with each request made using this Axios instance.
  headers: {
    //indicating that the data being sent in the request body is in JSON format.
    "Content-type": "application/json"
  }
});