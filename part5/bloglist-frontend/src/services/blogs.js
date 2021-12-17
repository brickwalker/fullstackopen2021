import axios from "axios";
const baseUrl = "/api/blogs";

const setToken = () => {
  const userString = localStorage.getItem("bloglistUser");
  if (userString) {
    const userObject = JSON.parse(userString);
    const token = userObject.token;
    return `Bearer ${token}`;
  } else {
    return null;
  }
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addBlog = async (blogObject) => {
  const token = setToken();
  if (token) {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.post(baseUrl, blogObject, config);
    return response.data;
  } else {
    console.error("Cannot add blog - token not available");
  }
};

const exports = { getAll, addBlog };

export default exports;
