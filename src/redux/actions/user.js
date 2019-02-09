import * as actionTypes from "./types";

export const setUser = payload => ({
  type: actionTypes.SET_USER,
  payload
});

export const clearUser = () => ({
  type: actionTypes.CLEAR_USER
});
