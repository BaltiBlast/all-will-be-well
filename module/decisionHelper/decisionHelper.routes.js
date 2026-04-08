import express from "express";
import { getDecisionHelperPage } from "./decisionHelper.controllers.js";

const decisionHelperRouter = express.Router();

decisionHelperRouter.get("/decision-helper", getDecisionHelperPage);

export default decisionHelperRouter;
