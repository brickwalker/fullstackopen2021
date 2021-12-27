const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), ".env.local") });
const { MONGO_USR, MONGO_PWD, MONGO_CLS, MONGO_DB } = process.env;

exports.MONGO_URI = `mongodb+srv://${MONGO_USR}:${MONGO_PWD}@${MONGO_CLS}/${MONGO_DB}?retryWrites=true&w=majority`;
