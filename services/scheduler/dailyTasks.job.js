const cron = require("node-cron");
const transporter = require("../nodemailer.js");
const { MessageMapper } = require("../../models/index.mapper.js");
const { buildProgrammedMessageEmail } = require("../../utils/emailTemplate.js");

const dailyTasks = {
  // ================================================================================ //
  // Daily tasks initialisation
  // ================================================================================ //
  init: () => {
    dailyTasks.emailDeliveryManager();
  },

  // ================================================================================ //
  // Manages the retrieval, sending, and deletion of daily messages
  // ================================================================================ //
  emailDeliveryManager: () => {
    cron.schedule(
      "0 7 * * *",
      async () => {
        console.log("[CRON] Lancement du job des messages du jour");
        const dateData = dailyTasks.getCurrentDay();

        try {
          const messages = await MessageMapper.getMessagesForToday(dateData);

          if (messages.length === 0) {
            const noMessageToday = new Date();
            console.log(`❌ Pas de message à envoyer aujourd'hui - ${noMessageToday}`);
            return;
          }

          for (const msg of messages) {
            await dailyTasks.processMessage(msg);
          }
        } catch (err) {
          console.error("[CRON] Erreur générale :", err);
        }
      },
      {
        scheduled: true,
        timezone: "Europe/Paris",
      }
    );
  },

  // ================================================================================ //
  // Sending the message by email and deletes the entity from the database
  // ================================================================================ //
  processMessage: async (msg) => {
    try {
      await dailyTasks.emailConfigurator(msg);
      console.log(`✅ Envoyé à ${msg.email}`);

      await MessageMapper.deleteMessageById(msg._id);
      console.log(`✅ Message de ${msg.first_name} supprimé de la BDD`);
    } catch (err) {
      console.error(`❌ Erreur avec ${msg.email}:`, err.message);
    }
  },

  // ================================================================================ //
  // Builds the email and sends it
  // ================================================================================ //
  emailConfigurator: async (msg) => {
    const { date_to_send, createdAt } = msg;

    const past = new Date(createdAt);
    const now = new Date(date_to_send);

    const timeDelay = dailyTasks.formatElapsedTime(past, now);

    const { subject, text, html } = buildProgrammedMessageEmail({
      firstName: msg.first_name,
      delayLabel: timeDelay,
      userMessage: msg.message,
    });

    await transporter.sendMail({
      from: `"All Will Be Well" <${process.env.MAIL_USER}>`,
      to: msg.email,
      subject,
      text,
      html,
    });
  },

  // ================================================================================ //
  // Calculates the time elapsed between two dates
  // ================================================================================ //
  formatElapsedTime: (from, to) => {
    const start = new Date(from);
    const end = new Date(to);

    let diff = Math.abs(end - start) / 1000;

    const days = Math.floor(diff / (3600 * 24));
    diff -= days * 3600 * 24;

    const hours = Math.floor(diff / 3600);
    diff -= hours * 3600;

    const minutes = Math.floor(diff / 60);
    diff -= minutes * 60;

    const seconds = Math.floor(diff);

    return `${days} jours, ${hours}h, ${minutes}min et ${seconds}s`;
  },

  // ================================================================================ //
  // Retrieves the current date to filter messages to be sent
  // ================================================================================ //
  getCurrentDay: () => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const dateData = {
      start: start,
      end: end,
    };

    return dateData;
  },
};

module.exports = dailyTasks;
