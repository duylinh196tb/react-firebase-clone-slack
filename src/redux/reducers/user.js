import * as actionTypes from "../actions/types";

const initialState = {
  currentUser: "",
  isLoading: true
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_USER:
      return {
        currentUser: payload,
        isLoading: false
      };

    default:
      return state;
  }
};
