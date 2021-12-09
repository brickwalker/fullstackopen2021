require("dotenv").config({ path: ".env.local" });

const { MONGO_CLUSTER, MONGO_DB, MONGO_USR, MONGO_PWD } = process.env;
const MONGO_URI = `mongodb+srv://${MONGO_USR}:${MONGO_PWD}@${MONGO_CLUSTER}/${MONGO_DB}?retryWrites=true&w=majority`;

const PORT = 3003;

module.exports = {
  MONGO_URI,
  PORT,
};
