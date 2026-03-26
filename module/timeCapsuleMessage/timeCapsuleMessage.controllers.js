import * as services from "./timeCapsuleMessage.services.js";

export async function getTimeCapsuleMessagePage(req, res) {
  try {
    const pageData = await services.timeCapsuleMessagePageData();
    const siteKey = process.env.RECAPTCHA_SITE_KEY;
    return res.render("form", { ...pageData, siteKey });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

export async function postNewTimeCapsuleMessage(req, res) {
  const { email, name, message, delay } = req.body;
  const token = req.body["g-recaptcha-response"];

  try {
    const result = await services.postNewCapsuleMessage({
      email,
      name,
      message,
      delay,
      token,
      ip: req.ip,
      recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
    });

    if (result.error) {
      if (result.error.type === "missing_captcha" || result.error.type === "invalid_captcha") {
        req.flash("messages", {
          type: "error",
          text: result.error.text,
          data: req.body,
        });
        return res.redirect("/");
      }

      req.flash("messages", {
        type: "error",
        text: result.error.text,
      });
      return res.redirect("/");
    }

    req.flash("messages", {
      type: "success",
      text: result.success.text,
    });

    return res.redirect("/");
  } catch (err) {
    console.error(err);

    req.flash("messages", {
      type: "error",
      text: "Une erreur est survenue. Veuillez réessayer plus tard",
    });

    return res.redirect("/");
  }
}
