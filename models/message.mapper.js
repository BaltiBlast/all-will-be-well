const CoreMapper = require("./core.mapper.js");
const messageSchema = require("../schemas/message.schema.js");

class MessageMapper extends CoreMapper {
  message = this.mongoose.model("Messages", messageSchema);

  async newMessage(data) {
    const newMessage = new this.message(data);
    return await newMessage.save();
  }

  async getMessagesForToday(data) {
    return await this.message.find({
      date_to_send: { $gte: data.start, $lte: data.end },
    });
  }

  async deleteMessageById(id) {
    return await this.message.findByIdAndDelete(id);
  }
}

module.exports = MessageMapper;
