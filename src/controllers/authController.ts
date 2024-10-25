import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({ username, password: hashedPassword });
		await newUser.save();
		res.status(201).json({
			message: "User registered successfully"
		})
	} catch (error) {
		res.status(500).json({
			message: "Couldn't register user"
		})
	}
};

const login = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });
		if (!user || !(await bcrypt.compare(password, user.password))) {
			res.status(401).json({
				message: "Invalid credentials"
			})
			return;
		}

		const token = jwt.sign(
			{id: user._id}, 
			process.env.JWT_SECRET!, 
			{expiresIn: "1h"}
		)

		res.status(200).json({ id: user.id, username: user.username, token });
	} catch (error) {
		res.status(500).json({
			message: "Couldn't log you in"
		})
	}
};

export {
	register,
	login,
}