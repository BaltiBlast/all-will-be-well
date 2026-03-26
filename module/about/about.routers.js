import express from "express";
const aboutPageRouter = express.Router();

import { getAboutPage } from "./about.controllers.js";

aboutPageRouter.get("/about", getAboutPage);

export default aboutPageRouter;
