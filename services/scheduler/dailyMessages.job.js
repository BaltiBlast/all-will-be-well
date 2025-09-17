const cron = require("node-cron");
const { MessageMapper } = require("../../models/index.mapper.js");

async function initDailyJob() {
  cron.schedule(
    "0 7 * * *",
    async () => {
      console.log("[CRON] Lancement du job des messages du jour");

      const start = new Date();
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setHours(23, 59, 59, 999);

      const dateData = {
        start: start,
        end: end,
      };

      try {
        const messages = await MessageMapper.getMessagesForToday(dateData);
        console.log("Messages trouvés :", messages);
        // TODO: service email
        // TODO: model to delete message in DB
      } catch (err) {
        console.error("[CRON] Erreur dans le job :", err);
      }
    },
    {
      scheduled: true,
      timezone: "Europe/Paris",
    }
  );
}

module.exports = initDailyJob;
