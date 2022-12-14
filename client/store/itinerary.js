import axios from 'axios';
import { fetchItinerary } from './singleItinerary';
// action type

const GET_ITINERARIES = 'GET_ITINERARIES';
const SET_ITINERARY = 'SET_ITINERARY';
const DELETE_ITINERARY = 'DELETE_ITINERARY';
const ADD_EVENT = 'ADD_EVENT';
const DELETE_EVENT = 'DELETE_EVENT';

// action creator(s)

export const getItineraries = (itineraries) => {
  return {
    type: GET_ITINERARIES,
    itineraries,
  };
};
export const setItinerary = (itinerary) => {
  return {
    type: SET_ITINERARY,
    itinerary,
  };
};
export const deleteItinerary = (itinerary) => {
  return {
    type: DELETE_ITINERARY,
    itinerary,
  };
};
export const addEvent = (event) => {
  return {
    type: ADD_EVENT,
    event,
  };
};
export const deleteEvent = (event) => {
  return { type: DELETE_EVENT, event };
};

// thunks

export const fetchItineraries = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${userId}/itineraries`);
    dispatch(getItineraries(data));
  } catch (error) {
    return error;
  }
};
export const createItinerary = (itinerary, userId) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `/api/users/${userId}/itinerary`,
      itinerary
    );
    dispatch(setItinerary(data));
  } catch (error) {
    return error;
  }
};
export const deleteItineraryById = (itineraryId) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/api/itineraries/${itineraryId}`);
    dispatch(deleteItinerary(data));
  } catch (error) {
    return error;
  }
};
export const addEventThunk = (itineraryId, event) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `/api/itineraries/${itineraryId}/addEvent`,
      event
    );
    dispatch(addEvent(data));
  } catch (error) {
    return error;
  }
};

export const deleteEventThunk = (itineraryId, eventId) => async (dispatch) => {
  try {
    //console.log(itineraryId, eventId, 'inside the thunk');
    const { data } = await axios.delete(
      `/api/itineraries/${itineraryId}/deleteEvent/${eventId}`
    );
    dispatch(deleteEvent(data));
    dispatch(fetchItinerary(itineraryId));
  } catch (error) {
    return error;
  }
};

//Reducer
export default function itinerary(state = [], action) {
  switch (action.type) {
    case GET_ITINERARIES:
      return action.itineraries;
    case SET_ITINERARY:
      return {
        ...state,
        itineraries: [...state.itineraries, action.itinerary],
      };
    case DELETE_ITINERARY:
      return state.itinararies.filter(
        (itinerary) => itinerary.id !== action.id
      );
    case ADD_EVENT:
      return state;
    case DELETE_EVENT: {
      return state;
      // let newState = state.events.filter(
      //   (event) => event.id !== action.event.id
      // );
      // return { ...state, events: newState };
    }
    default:
      return state;
  }
}
