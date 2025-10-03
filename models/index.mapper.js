const mongoose = require("../services/mongoDB.js");
const Message = require("./message.mapper.js");
const Counter = require("./counter.mapper.js");
const Visitor = require("./visitor.mapper.js");

module.exports = {
  MessageMapper: new Message(mongoose),
  CounterMapper: new Counter(mongoose),
  CounterVisitor: new Visitor(mongoose),
};
