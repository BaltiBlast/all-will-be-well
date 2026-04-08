import express from "express";
const router = express.Router();

import timeCapsuleMessageRouter from "../module/timeCapsuleMessage/timeCapsuleMessage.routes.js";
import aboutPageRouter from "../module/about/about.routers.js";
import homeRouter from "../module/home/home.routes.js";
import decisionHelper from "../module/decisionHelper/decisionHelper.routes.js";

// ================================= //
// Router
// ================================= //

// Tools
router.use("/tool", timeCapsuleMessageRouter);
router.use("/tool", decisionHelper);

// Generic
router.use(aboutPageRouter);
router.use(homeRouter);

// 404
router.use((req, res) => {
  res.status(404).render("404", { navbar: false, footer: false });
});

export default router;
