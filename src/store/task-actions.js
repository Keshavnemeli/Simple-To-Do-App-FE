import { baseUrl } from "../config/config";
import getAuthHeaders from "../utils/utils";

export const setTasks = (payload) => {
  return {
    type: "SET_TASKS",
    payload: payload,
  };
};

export const setUpdate = (payload) => {
  return {
    type: "SET_IS_UPDATED",
  };
};

export const setSearchDispatch = (payload) => {
  return {
    type: "SET_SEARCH",
    payload: payload,
  };
};

export const setCompleted = (payload) => {
  return {
    type: "SET_COMPLETED",
    payload: payload,
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

const sendRequest = async ({
  endpoint = "",
  method = "GET",
  data = null,
  headers = { "Content-Type": "application/json" },
} = {}) => {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: method,
    body: data && JSON.stringify(data),
    headers: headers,
  });

  const responseJson = await response?.json();
  if (!response.ok) {
    throw new Error(
      responseJson.error ? responseJson.error : "Authentication Failed"
    );
  }
  return responseJson;
};

export const fetchTasks = async ({
  dispatch,
  completed = null,
  search = "",
  page = 1,
  limit = 5,
}) => {
  dispatch(setLoader(true));

  const queryParams = `?${completed !== null ? `completed=${completed}&` : ""}${
    search && `search=${search}&`
  }page=${page}&limit=${limit}`;
  const endpoint = "/tasks" + queryParams;

  try {
    const responseData = await sendRequest({
      endpoint: endpoint,
      headers: {
        Authorization: getAuthHeaders(),
        "Content-Type": "application/json",
      },
    });

    dispatch(setLoader(false));
    dispatch(setTasks(responseData));
  } catch (e) {
    dispatch(setLoader(false));
    dispatch(setError({ error: "Couldn't fetch Data" }));
  }
};

export const addTask = async ({ dispatch, data }) => {
  dispatch(setLoader(true));
  const endpoint = `/tasks`;
  try {
    await sendRequest({
      endpoint: endpoint,
      method: "POST",
      data: data,
      headers: {
        Authorization: getAuthHeaders(),
        "Content-Type": "application/json",
      },
    });
    dispatch(setLoader(false));
    dispatch(setUpdate(true));
  } catch (e) {
    dispatch(setLoader(false));
    dispatch(setError({ error: "Couldn't update Data" }));
  }
};

export const updateTask = async ({ dispatch, id, data }) => {
  dispatch(setLoader(true));
  const endpoint = `/tasks/${id}`;
  try {
    await sendRequest({
      endpoint: endpoint,
      method: "PATCH",
      data: data,
      headers: {
        Authorization: getAuthHeaders(),
        "Content-Type": "application/json",
      },
    });
    dispatch(setLoader(false));
    dispatch(setUpdate(true));
  } catch (e) {
    dispatch(setLoader(false));
    dispatch(setError({ error: "Couldn't update Data" }));
  }
};

export const deleteTask = async ({ dispatch, id }) => {
  dispatch(setLoader(true));
  const endpoint = `/tasks/${id}`;
  try {
    await sendRequest({
      endpoint: endpoint,
      method: "DELETE",
      headers: {
        Authorization: getAuthHeaders(),
        "Content-Type": "application/json",
      },
    });
    dispatch(setLoader(false));
    dispatch(setUpdate(true));
  } catch (e) {
    dispatch(setLoader(false));
    console.log(e.message);
    dispatch(setError({ error: "Couldn't update Data" }));
  }
};
