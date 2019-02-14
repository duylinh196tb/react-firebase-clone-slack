import * as actionTypes from "../actions/types";

const initialState = {
  currentChannel: ""
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: payload
      };

    default:
      return state;
  }
};
