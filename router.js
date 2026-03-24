import express from "express";
const router = express.Router();

import form from "./controllers/form/form.controller.js";
const { getForm, postMessage } = form;

import about from "./controllers/about/about.controller.js";
const { getAbout } = about;

import error404 from "./controllers/errors/404.controller.js";
const { get404 } = error404;

router.get("/", getForm);
router.get("/about", getAbout);
router.post("/add-message", postMessage);

// 404
router.use(get404);

export default router;
