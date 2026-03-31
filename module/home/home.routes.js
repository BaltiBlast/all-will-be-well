import express from "express";
import { getHomePage } from "./home.controllers.js";

const homeRouter = express.Router();

homeRouter.get("/", getHomePage);

export default homeRouter;
