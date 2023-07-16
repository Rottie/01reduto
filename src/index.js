//imports the React library, which is required to use JSX (JavaScript XML) syntax and other React-related functionalities.
import React from 'react';
//imports the ReactDOM library from the react-dom/client module.
//ReactDOM is a package that provides methods for rendering React elements into the DOM (Document Object Model).
import ReactDOM from 'react-dom/client';

//common practice to import CSS files in React applications to style the components and the overall layout.
import './index.css';

// imports the App component from the ./App module.
//App component is the root component of the application and represents the main entry point.
import App from './App';

// imports a function named reportWebVitals from the ./reportWebVitals module.
// typically used for measuring the performance of the application.
import reportWebVitals from './reportWebVitals';

// imports the Provider component from the react-redux library.
//Provider component is used to wrap the root component of the application
//provides the Redux store to all components in the application.
import { Provider } from 'react-redux';

// imports the Redux store from the ./store module.
//1.Redux store holds the application's state
//2.allows components to interact with the state using Redux actions and reducers.
import store from './store';

// creates a React root using the createRoot method from the ReactDOM library. 
//The root is the entry point for React to render the application into the DOM. 
// created by passing the DOM element with the id of root as the target container.
const root = ReactDOM.createRoot(document.getElementById('root'));

// renders the application into the DOM by calling the render method on the React root (root). 
//The content to be rendered is wrapped inside the <Provider> component
// provides access to the Redux store for all components within the application.
//root component of the application is <App />, and it is rendered inside the <Provider> component.
root.render(
  <Provider store={store}>
  <App />
</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


// calls the reportWebVitals function, which is responsible for measuring and reporting performance metrics in the application.
//typically used for performance monitoring and optimization.
reportWebVitals();


//Summary
//In summary, this code sets up a React application renders the root component (<App />) wrapped with the Redux Provider component, and initializes performance monitoring if necessary
//The application will be rendered into the DOM element with the id of root.