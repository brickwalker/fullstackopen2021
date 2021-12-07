import axios from "axios";
const baseUrl = "https://sheltered-sands-12002.herokuapp.com/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const createEntry = (newObject) => {
  return axios.post(baseUrl, newObject).then((response) => response.data);
};

const deleteEntry = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const updateEntry = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data);
};

const contacts = {
  getAll,
  createEntry,
  deleteEntry,
  updateEntry,
};

export default contacts;
