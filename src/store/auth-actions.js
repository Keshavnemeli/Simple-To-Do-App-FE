export const login = (payload) => {
  return {
    type: "LOGIN",
    payload: payload,
  };
};

export const logout = (payload) => {
  return {
    type: "LOGOUT",
  };
};

export const setLoader = (payload) => {
  return {
    type: "SET_LOADER",
    payload: payload,
  };
};

export const setError = (payload) => {
  return {
    type: "SET_ERROR",
    payload: payload,
  };
};

export const sendAuthRequest = async (
  dispatch,
  action,
  endpoint,
  method = "GET",
  data = null,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  dispatch(setLoader(true));
  try {
    const response = await fetch(`http://localhost:8080${endpoint}`, {
      method: method,
      body: JSON.stringify(data),
      headers: headers,
    });

    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(
        responseJson.error ? responseJson.error : "Authentication Failed"
      );
    }

    dispatch(setLoader(false));
    dispatch(action(responseJson));
    return responseJson;
  } catch (error) {
    dispatch(setLoader(false));
    dispatch(setError({ error: error.message }));
  }
};

export const authenticate = async (dispatch) => {
  dispatch(setLoader(true));
  try {
    const response = await fetch("http://localhost:8080/users/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    });

    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(
        responseJson.error ? responseJson.error : "Authentication Failed"
      );
    }
    dispatch(setLoader(false));
    dispatch(
      login({
        token: localStorage.getItem("token"),
        user: responseJson,
      })
    );
  } catch (error) {
    dispatch(setLoader(false));
    dispatch(setError({ error: error.message }));
    dispatch(logout());
  }
};
