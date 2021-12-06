import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const createEntry = (newObject) => {
  return axios.post(baseUrl, newObject).then((response) => response.data);
};

const contacts = {
  getAll,
  createEntry,
};

export default contacts;
