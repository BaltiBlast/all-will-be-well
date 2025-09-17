const mongoose = require("../services/mongoDB.js");
const Message = require("./message.mapper.js");
const Counter = require("./counter.mapper.js");

module.exports = {
  MessageMapper: new Message(mongoose),
  CounterMapper: new Counter(mongoose),
};
