import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/tokenUtils";

const register = async (req: Request, res: Response) => {
	const { username, password, fullName } = req.body;

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({ username, password: hashedPassword, fullName });
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

		const accessToken = generateAccessToken(String(user._id));
		const refreshToken = generateRefreshToken(String(user._id));

		res.status(200).json({ id: user.id, username: user.username, fullName: user.fullName, accessToken, refreshToken });
	} catch (error) {
		res.status(500).json({
			message: "Couldn't log you in"
		})
	}
};

const refreshToken = async (req: Request, res: Response) => {
	const { refreshToken } = req.body;
	
	try {
		if (!refreshToken) {
			res.status(400).json({
				message: 'Refresh token was not provided.'
			})
			return;
		}

		jwt.verify(refreshToken, process.env.JWT_SECRET!, (err: any, user: any) => {
			if (err) {
				res.status(401).json({
					message: 'Invalid token'
				});
				return;
			}

			const newAccessToken = generateAccessToken(user.id);
			res.status(201).json({
				accessToken: newAccessToken
			})
		})
	} catch (error) {
		res.status(500).json({
			message: "Couldn't refresh the token. Please try again or re-login."
		})
	}
}

export {
	register,
	login,
	refreshToken,
}