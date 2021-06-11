const getAuthHeaders = () => {
  return "Bearer " + localStorage.getItem("token");
};

export default getAuthHeaders;
