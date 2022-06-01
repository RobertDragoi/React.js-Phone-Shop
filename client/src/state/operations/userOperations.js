import {
  registerAction,
  loginAction,
  registerErrorAction,
  loginErrorAction,
  loadUserAction,
  clearErrorsAction,
  logoutAction,
  setMinutesAction,
  setSecondsAction,
} from "../actions/userActions";
import { clearCartAction } from "../actions/productActions";
import Cookies from "js-cookie";
import axios from "axios";
export const loginOperation = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      "http://localhost:8080/api/login",
      formData,
      config
    );
    dispatch(loginAction(res.data));
    dispatch(loadUserOperation());
    dispatch(setMinutesOperation(60));
    dispatch(setSecondsOperation(0));
  } catch (error) {
    dispatch(loginErrorAction(error.response.data));
  }
};

export const registerOperation = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      "http://localhost:8080/api/register",
      formData,
      config
    );
    dispatch(registerAction(res.data));
    dispatch(loadUserOperation());
    dispatch(setMinutesOperation(60));
    dispatch(setSecondsOperation(0));
  } catch (error) {
    dispatch(registerErrorAction(error.response.data));
  }
};

export const loadUserOperation = () => async (dispatch) => {
  if (Cookies.get("auth-token")) {
    setAuthToken(Cookies.get("auth-token"));
  }
  try {
    const res = await axios.get("http://localhost:8080/api/login");
    dispatch(loadUserAction(res.data));
  } catch (error) {
    dispatch(loginErrorAction(error.response.data));
  }
};

export const logoutOperation = () => async (dispatch) => {
  dispatch(logoutAction());
  dispatch(clearCartAction());
};

export const setMinutesOperation = (minutes) => async (dispatch) => {
  dispatch(setMinutesAction(minutes));
};

export const setSecondsOperation = (seconds) => async (dispatch) => {
  dispatch(setSecondsAction(seconds));
};

export const clearErrorsOperation = () => async (dispatch) => {
  dispatch(clearErrorsAction());
};
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};
