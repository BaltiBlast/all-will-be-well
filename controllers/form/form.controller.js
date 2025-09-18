const { MessageMapper, CounterMapper } = require("../../models/index.mapper.js");

const form = {
  getForm: async (req, res) => {
    try {
      const messageWaiting = await MessageMapper.countPendingMessages();
      const messageSent = await CounterMapper.getCounterMessageSent();
      const { sentMessageCount } = messageSent;

      return res.render("form", { messageWaiting, sentMessageCount });
    } catch (error) {
      console.log(err);
      res.redirect("/");
    }
  },

  postMessage: async (req, res) => {
    const { email, name, message, delay } = req.body;

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

module.exports = form;
