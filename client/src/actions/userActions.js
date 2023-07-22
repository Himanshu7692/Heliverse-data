// actions/userActions.js
import axios from "axios";

export const fetchUser = () => async (dispatch) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/api/users`);
    dispatch({ type: "FETCH_USERS_SUCCESS", payload: response.data });
  } catch (error) {
    console.error("Error fetching users:", error);
    dispatch({ type: "FETCH_USERS_FAILURE", payload: error.message });
  }
};

export const addToTeam = (user) => ({
  type: "ADD_TO_TEAM",
  payload: user,
});
