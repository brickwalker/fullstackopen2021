require("dotenv").config({ path: ".env.local" });

const { MONGO_CLUSTER, MONGO_DB, MONGO_USR, MONGO_PWD, TEST_MONGO_DB, JWT_SECRET, TEMP_TOKEN } =
  process.env;

let MONGO_URI;
process.env.NODE_ENV === "test"
  ? (MONGO_URI = `mongodb+srv://${MONGO_USR}:${MONGO_PWD}@${MONGO_CLUSTER}/${TEST_MONGO_DB}?retryWrites=true&w=majority`)
  : (MONGO_URI = `mongodb+srv://${MONGO_USR}:${MONGO_PWD}@${MONGO_CLUSTER}/${MONGO_DB}?retryWrites=true&w=majority`);

const PORT = 3003;

module.exports = {
  MONGO_URI,
  PORT,
  JWT_SECRET,
  TEMP_TOKEN
};
