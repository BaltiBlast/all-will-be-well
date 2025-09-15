const mongoose = require("../services/mongoDB.js");
const Message = require("./message.mapper.js");

module.exports = {
  MessageMapper: new Message(mongoose),
};
