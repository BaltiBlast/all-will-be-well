import querystring from "node:querystring";
import { CounterMapper, CounterVisitor, MessageMapper } from "../../models/index.mapper.js";
// import CounterMapper from "../../models/index.mapper.js";
// import MessageMapper from "../../models/index.mapper.js";
// import CounterVisitor from "../../models/index.mapper.js";

// import * as model from "../../models/index.mapper.js";

console.log(CounterMapper);

const form = {
  getForm: async (req, res) => {
    try {
      const messageWaiting = await MessageMapper.countPendingMessages();
      const messageSent = await CounterMapper.getCounterMessageSent();
      const { sentMessageCount } = messageSent;
      const siteKey = process.env.RECAPTCHA_SITE_KEY;

      await CounterVisitor.incrementCounter();
      const visitor = await CounterVisitor.getVisitorCounter();
      const { landingVisitCount } = visitor;

      return res.render("form", { messageWaiting, sentMessageCount, siteKey, landingVisitCount });
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
  },

  postMessage: async (req, res) => {
    const { email, name, message, delay } = req.body;

    const token = req.body["g-recaptcha-response"];
    if (!token) {
      req.flash("messages", { type: "error", text: "Captcha manquant.", data: req.body });
      return res.redirect("/");
    }

    const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: querystring.stringify({
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: token,
        remoteip: req.ip,
      }),
    });

    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      req.flash("messages", { type: "error", text: "Vérification reCAPTCHA échouée. Réessaie.", data: req.body });
      return res.redirect("/");
    }

    const dateToSend = new Date();
    let customDateMessage;

    switch (delay) {
      case "3d":
        dateToSend.setDate(dateToSend.getDate() + 3);
        customDateMessage = "3 jours";
        break;
      case "1w":
        dateToSend.setDate(dateToSend.getDate() + 7);
        customDateMessage = "1 semaine";
        break;
      case "1m":
        dateToSend.setMonth(dateToSend.getMonth() + 1);
        customDateMessage = "1 mois";
        break;
      case "3m":
        dateToSend.setMonth(dateToSend.getMonth() + 3);
        customDateMessage = "3 mois";
        break;
      case "6m":
        dateToSend.setMonth(dateToSend.getMonth() + 6);
        customDateMessage = "6 mois";
        break;
      default:
        // Flash message - error bad timing
        req.flash("messages", { type: "error", text: "Délai invalide." });
        return res.redirect("/");
    }

    try {
      const messageData = {
        email,
        first_name: name,
        message,
        date_to_send: dateToSend,
      };

      await MessageMapper.newMessage(messageData);

      // Flash message - success message added
      req.flash("messages", { type: "success", text: `Message ajouté. À dans ${customDateMessage} 😄 !` });
      return res.redirect("/");
    } catch (err) {
      if (err.code === 11000 && err.keyPattern?.email) {
        // Flash message - email already exist
        req.flash("messages", { type: "error", text: "Cet email est déjà utilisé." });
        return res.redirect("/");
      }

      console.error(err);

      // Flash message - unknown error
      req.flash("messages", { type: "error", text: "Une erreur est survenue. Veuillez réessayer plus tard" });
      return res.redirect("/");
    }
  },
};

export default form;
