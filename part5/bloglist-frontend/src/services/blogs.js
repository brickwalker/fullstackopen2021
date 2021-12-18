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

const createConfig = () => {
  const token = setToken();
  if (token) {
    const config = {
      headers: { Authorization: token },
    };
    return config;
  } else {
    return null;
  }
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addBlog = async (blogObject) => {
  const config = createConfig();
  if (config) {
    const response = await axios.post(baseUrl, blogObject, config);
    return response.data;
  } else {
    console.error("Cannot add blog - token not available");
  }
};

const updateBlog = async (id, blogObject) => {
  const config = createConfig();
  if (config) {
    const response = await axios.put(`${baseUrl}/${id}`, blogObject, config);
    return response.data;
  } else {
    console.error("Cannot update blog - token not available");
  }
};

const deleteBlog = async (id) => {
  const config = createConfig();
  if (config) {
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
  } else {
    console.error("Cannot delete blog - token not available");
  }
}

const exports = { getAll, addBlog, updateBlog, deleteBlog };

export default exports;
