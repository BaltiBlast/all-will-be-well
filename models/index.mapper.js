import mongoose from "../services/mongoDB.js";
import Message from "./message.mapper.js";
import Counter from "./counter.mapper.js";
import Visitor from "./visitor.mapper.js";

export const MessageMapper = new Message(mongoose);
export const CounterMapper = new Counter(mongoose);
export const CounterVisitor = new Visitor(mongoose);
