//mports two functions, createSlice and createAsyncThunk, from the @reduxjs/toolkit library. 
//These functions are part of Redux Toolkit, which simplifies the process of creating Redux logic, including reducers and asynchronous action creators.
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


import TutorialDataService from "../services/TutorialService";

// sets the initial state of the tutorial slice of the Redux store to an empty array. 
// This state will hold an array of tutorial objects.
const initialState = [];

// defines an asynchronous action creator named createTutorial
// It uses createAsyncThunk to create an asynchronous thunk action. 
export const createTutorial = createAsyncThunk(
  // The action is dispatched when a new tutorial is to be created
  "tutorials/create",
  async ({ title, description }) => {
    //It interacts with an external service (TutorialDataService) to make an HTTP POST request to create the tutorial.
    const res = await TutorialDataService.create({ title, description });
    // If successful, it returns the newly created tutorial data.
    return res.data;
  }
);

// defines an asynchronous action creator named retrieveTutorials
export const retrieveTutorials = createAsyncThunk(
  "tutorials/retrieve",
  //It dispatches an action to retrieve all tutorials by making an HTTP GET request using TutorialDataService.
  async () => {
    const res = await TutorialDataService.getAll();
    return res.data;
  }
);

// defines an asynchronous action creator named updateTutorial. It is dispatched when a tutorial needs to be updated
export const updateTutorial = createAsyncThunk(
  "tutorials/update",
 //sends an HTTP PUT request using TutorialDataService with the updated data and the tutorial's ID
  async ({ id, data }) => {
    const res = await TutorialDataService.update(id, data);
    //If successful, it returns the updated tutorial data.
    return res.data;
  }
);

//defines an asynchronous action creator named deleteTutorial.
export const deleteTutorial = createAsyncThunk(
  //It is dispatched when a tutorial needs to be deleted.
  "tutorials/delete",
  async ({ id }) => {
    // It sends an HTTP DELETE request using TutorialDataService with the tutorial's ID.
    await TutorialDataService.remove(id);
    //If successful, it returns an object with the ID of the deleted tutorial.
    return { id };
  }
);

// defines an asynchronous action creator named deleteAllTutorials.
export const deleteAllTutorials = createAsyncThunk(
  //It is dispatched when all tutorials need to be deleted. 
  "tutorials/deleteAll",
  // It sends an HTTP DELETE request using TutorialDataService to remove all tutorials.
  async () => {
    const res = await TutorialDataService.removeAll();
    return res.data;
  }
);

// defines an asynchronous action creator named findTutorialsByTitle. It is dispatched when tutorials need to be filtered by title
export const findTutorialsByTitle = createAsyncThunk(
  "tutorials/findByTitle",
  //It sends an HTTP GET request using TutorialDataService with the specified title and returns the matching tutorials.
  async ({ title }) => {
    const res = await TutorialDataService.findByTitle(title);
    return res.data;
  }
);

//creates a Redux slice using createSlice.
//A slice is a part of the Redux state that has its own reducer logic and action creators.
const tutorialSlice = createSlice({
  //The slice name is "tutorial," and its initial state is set to initialState (an empty array). 
  name: "tutorial",
  initialState,
  reducers: {},
  //specifies extra reducer logic that handles the asynchronous actions (createTutorial, retrieveTutorials,
  // The builder parameter is used to define how the state is updated in response to fulfilled promises from the async actions.
  extraReducers:(builder) => {
    builder
    // adds a case for the createTutorial.fulfilled action
    //andles the successful completion of the createTutorial async action.
    //It pushes the newly created tutorial data (action.payload) to the state array.
    .addCase(createTutorial.fulfilled,(state, action) => {
      state.push(action.payload);
    })

    //adds a case for the retrieveTutorials.fulfilled action,
    //handles the successful completion of the retrieveTutorials async action
    // It replaces the state array with the array of tutorials received from the server (action.payload).
    .addCase(retrieveTutorials.fulfilled, (state, action) => {
      return [...action.payload];
    })

    //This adds a case for the updateTutorial.fulfilled action
    //handles the successful completion of the updateTutorial async action. 
    .addCase(updateTutorial.fulfilled, (state, action) => {
    // It finds the tutorial in the state array based on the tutorial's ID
      const index = state.findIndex(
        
        (tutorial) => tutorial.id === action.payload.id);

 //updates its properties with the new data received from the server (action.payload).
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    })

    //adds a case for the deleteTutorial.fulfilled action,
    // handles the successful completion of the deleteTutorial async action
    .addCase(deleteTutorial.fulfilled , (state, action) => {
      // finds the tutorial with the specified ID in the state array and removes it from the array.
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    })

    // adds a case for the deleteAllTutorials.fulfilled action
    //handles the successful completion of the deleteAllTutorials async action.
    // sets the state array to an empty array, effectively removing all tutorials from the state.
    .addCase(deleteAllTutorials.fulfilled,(state, action) => {
      return [];
    })

    // adds a case for the findTutorialsByTitle.fulfilled action,
    //handles the successful completion of the findTutorialsByTitle async action. 
    .addCase(findTutorialsByTitle.fulfilled,(state, action) => {
      //It sets the state array to the array of tutorials that match the specified title (action.payload).
      return [...action.payload];
    });


  },
});


//This extracts the reducer function from the tutorialSlice object.
const { reducer } = tutorialSlice;

//This exports the reducer function as the default export of this module. 
//The reducer handles the state updates for the tutorial slice of the Redux store.
export default reducer;