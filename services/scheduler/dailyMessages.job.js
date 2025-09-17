const { MessageMapper } = require("../../models/index.mapper.js");

async function initDailyJob() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const dateData = {
    start: start,
    end: end,
  };

  const messages = await MessageMapper.getMessagesForToday(dateData);
  //   console.log(messages);
}

module.exports = initDailyJob;
