
//imports the configureStore function from the @reduxjs/toolkit library. 
//configureStore is a function provided by Redux Toolkit that simplifies the process of creating a Redux store.
import { configureStore } from '@reduxjs/toolkit'
//imports the tutorialReducer from the ./slices/tutorials module
//tutorialReducer is a Redux reducer function responsible for handling state updates related to tutorials.
// Redux reducers specify how the application's state changes in response to dispatched actions.
import tutorialReducer from './slices/tutorials';

//creates an object named reducer with a single property tutorials
//tutorials property is assigned the tutorialReducer function. 
const reducer = {
// This object will be passed as an argument to the configureStore  function to combine all reducers into a single reducer.

  tutorials: tutorialReducer
}

//configures and creates the Redux store using the configureStore function. 
//takes an options object as an argument,options object includes:
const store = configureStore({
  //Specifies the root reducer that combines all individual reducers. 
  //reducer object is used to manage the state updates for the tutorials slice of the state.
  reducer: reducer,
  //Enables the Redux DevTools extension in the browser
  //Redux DevTools provide a powerful debugging tool to inspect and time-travel through the application's state changes.
  devTools: true,
})

//exports the created Redux store as the default export of this module.
// By exporting the store, other parts of the application can import and use it to interact with the Redux state.
export default store;

//Summary
//1. sets up the Redux store for the application using Redux Toolkit's configureStore function.
//2.combines the tutorialReducer to manage the state related to tutorials and enables the Redux DevTools for easier debugging. 
//3. created store is exported as the default export of the module, making it available for use in other parts of the application.