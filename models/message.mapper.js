const CoreMapper = require("./core.mapper.js");
const messageSchema = require("../schemas/message.schema.js");

class MessageMapper extends CoreMapper {
  message = this.mongoose.model("Messages", messageSchema);

  async newMessage(data) {
    const newMessage = new this.message(data);
    return await newMessage.save();
  }
}

module.exports = MessageMapper;
