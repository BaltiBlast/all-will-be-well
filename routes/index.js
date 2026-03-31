import express from "express";
const router = express.Router();

import timeCapsuleMessageRouter from "../module/timeCapsuleMessage/timeCapsuleMessage.routes.js";
import aboutPageRouter from "../module/about/about.routers.js";
import homeRouter from "../module/home/home.routes.js";

// Router
router.use("/tool", timeCapsuleMessageRouter);
router.use(aboutPageRouter);
router.use(homeRouter);

// 404
router.use((req, res) => {
  res.status(404).render("404", { navbar: false, footer: false });
});

export default router;
