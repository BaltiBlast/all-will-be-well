import express from "express";
const router = express.Router();

import timeCapsuleMessageRouter from "../module/timeCapsuleMessage/timeCapsuleMessage.routes.js";
import aboutPageRouter from "../module/about/about.routers.js";

// Router
router.use(timeCapsuleMessageRouter);
router.use(aboutPageRouter);

// 404
router.use((req, res) => {
  res.status(404).render("404", { navbar: false, footer: false });
});

export default router;
