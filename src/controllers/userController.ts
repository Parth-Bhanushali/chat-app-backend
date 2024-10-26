import { Request, Response } from "express";
import User from "../models/User";

const getUserStatus = async (req: Request, res: Response) => {
	try {
		const user = await User
			.findById(req.params.userId)
			.select('isOnline lastSeen fullName username');

		if (!user) {
			res.status(404).json({
				message: 'User not found'
			})
			return;
		}

		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({
			message: "Couldn't fetch user status"
		})
	}
}

export {
	getUserStatus
}