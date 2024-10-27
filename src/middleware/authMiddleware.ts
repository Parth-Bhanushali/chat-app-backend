import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization;
	
	if (!token) {
		res.status(403).json({
			message: "Access denied"
		})
		return;
	}

	try {
		const verified = jwt.verify(token, process.env.JWT_SECRET!);
		// @ts-ignore
		req.currentUser = verified;
		next();
	} catch (error) {
		res.status(401).json({
			message: "Token expired"
		})
	}
}

export default authMiddleware;