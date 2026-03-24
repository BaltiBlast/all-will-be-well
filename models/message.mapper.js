import CoreMapper from "./core.mapper.js";
import messageSchema from "../schemas/message.schema.js";

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

  async countPendingMessages() {
    return await this.message.countDocuments();
  }
}

export default MessageMapper;
