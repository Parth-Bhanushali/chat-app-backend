import mongoose from "mongoose";

interface IMessage extends mongoose.Document {
	sender: mongoose.Types.ObjectId;
	receiver: mongoose.Types.ObjectId;
	content: string;
	timestamp: Date;
}

const MessageSchema = new mongoose.Schema<IMessage>({
	sender: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: "User", 
		required: true 
	},
	receiver: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	content: {
		type: String,
		required: true
	},
	timestamp: {
		type: Date,
		default: Date.now
	}
});

const Message = mongoose.model<IMessage>("Message", MessageSchema);

export default Message;