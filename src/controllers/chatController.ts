import { Request, Response } from "express";
import Message from "../models/Message";
import { getSocket } from "../config/socket";
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
		})

		await newMessage.save();

		// @ts-ignore
		getSocket().to([receiver, sender]).emit('receiveMessage', {
			// @ts-ignore
			sender,
			receiver,
			content,
		});

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
    const messages = await Message.find({
      $or: [
        { sender: self },
				{ receiver: self },
      ],
    });

    const contactIds = new Set<string>();
    messages.forEach(message => {
			// @ts-ignore
      const contactId = message.sender.equals(self) ? message.receiver : message.sender;
      contactIds.add(contactId.toString());
    });

    const contacts = await User
			.find({ _id: { $in: Array.from(contactIds) } })
			.select('username _id');

    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Couldn't fetch contacts" });
  }
};

export {
	sendMessage,
	getMessages,
	getContacts,
}