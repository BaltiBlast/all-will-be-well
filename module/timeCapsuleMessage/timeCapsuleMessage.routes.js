import express from "express";
import { getTimeCapsuleMessagePage, postNewTimeCapsuleMessage } from "./timeCapsuleMessage.controllers.js";

const timeCapsuleMessageRouter = express.Router();

timeCapsuleMessageRouter.get("/", getTimeCapsuleMessagePage);
timeCapsuleMessageRouter.post("/add-message", postNewTimeCapsuleMessage);

export default timeCapsuleMessageRouter;
