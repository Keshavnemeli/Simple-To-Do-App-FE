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
  console.log(endpoint, headers, method);
  const response = await fetch(`http://localhost:8080${endpoint}`, {
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
  console.log(responseJson);
  return responseJson;
};

export const fetchTasks = async ({
  dispatch,
  sort = "ascending",
  search = "",
  page = 1,
  limit = 5,
}) => {
  dispatch(setLoader(true));

  const queryParams = `?sortBy=${
    sort === "ascending" ? "" : "desc"
  }&page=${page}&limit=${limit}${search && `&search=${search}`}`;

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
