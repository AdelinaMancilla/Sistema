const moment = require("moment");

const getDate = () => {
  return moment().format("YYYY-M-D");
};
const getTime = () => {
  return moment().format("HH:mm:ss");
};
module.exports = { getDate, getTime };
