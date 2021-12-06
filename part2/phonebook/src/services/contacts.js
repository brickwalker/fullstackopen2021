import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const createEntry = (newObject) => {
  return axios.post(baseUrl, newObject).then((response) => response.data);
};

const deleteEntry = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const contacts = {
  getAll,
  createEntry,
  deleteEntry,
};

export default contacts;
