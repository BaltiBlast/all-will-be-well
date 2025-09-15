const { MessageMapper } = require("../../models/index.mapper.js");

const form = {
  getForm: (req, res) => {
    res.render("form");
  },

  postMessage: async (req, res) => {
    const { email, name, message, delay } = req.body;

    const dateToSend = new Date();
    let customDateMessage;

    switch (delay) {
      // -> Just à test case
      // case "test":
      //   dateToSend.setDate(dateToSend.getDate());
      //   customDateMessage = "";
      //   break;
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
    }

    try {
      const messageData = {
        email: email,
        first_name: name,
        message: message,
        date_to_send: dateToSend,
      };

      const data = await MessageMapper.newMessage(messageData);
      console.log("DATA RESEND", data);

      res.json({ success: true, successMessage: `Message programé ! À dans ${customDateMessage} !` });
    } catch (error) {
      if (error.code === 11000) {
        return res.json({ success: false, errorMessage: "L'email est déjà utilisé" });
      } else {
        console.log(error.message);
        res.json({
          success: false,
          errorMessage: "Une erreur est survenu au moment de l'ajout. Veuillez résessayer plus tard",
        });
      }
    }
  },
};

module.exports = form;
