// reducers/userReducer.js
const initialState = {
  users: [],
  selectedUsers: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_SUCCESS":
      return { ...state, users: action.payload };
    case "FETCH_USERS_FAILURE":
      return state;
    case "ADD_TO_TEAM":
      return {
        ...state,
        selectedUsers: [...state.selectedUsers, action.payload],
      };
    default:
      return state;
  }
};

export default userReducer;
