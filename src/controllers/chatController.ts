import { Request, Response } from "express";
import Message from "../models/Message";
import { getSocket } from "../sockets/socket";
import User from "../models/User";

const sendMessage = async (req: Request, res: Response) => {
	const { receiver, content } = req.body;

	try {
		// @ts-ignore
		const sender = req.currentUser.id; // from middleware

		const newMessage = new Message({
			sender,
			receiver,
			content,
			status: 'sent',
		})

		const savedMessage = await newMessage.save();

		// @ts-ignore
		getSocket().to([receiver, sender]).emit('receiveMessage', savedMessage);

		res.status(201).json(newMessage);
	} catch (error) {
		res.status(500).json({
			message: "Couldn't send the message"
		})
	}
};

const getMessages = async (req: Request, res: Response) => {
	const { userId: secondParty } = req.params;
	// @ts-ignore
	const self = req.currentUser.id;	// from middleware

	try {
		const messages = await Message.find({
			$or: [
				{ sender: self, receiver: secondParty },
				{ sender: secondParty, receiver: self }
			]
		})
		
		res.json(messages);
	} catch (error) {
		res.status(500).json({
			message: "Couldn't fetch messages"
		})
	}
};

const getContacts = async (req: Request, res: Response): Promise<void> => {
	// @ts-ignore
  const self = req.currentUser.id
	try {
    // Fetch all users except the currently logged-in user
    const users = await User.find({ _id: { $ne: self } })
      .select('username fullName _id isOnline lastSeen');

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Couldn't fetch users" });
  }
};

export {
	sendMessage,
	getMessages,
	getContacts,
}