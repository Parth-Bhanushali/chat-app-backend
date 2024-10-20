import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDatabase = async () => {
	try {
		await mongoose.connect(process.env.MONGO_DB_URI!)
		console.log("Connected to MongoDB database")
	} catch (error) {
		console.error("Failed to connect to MongoDB: ", error);
		process.exit(1);
	}
}

export default connectDatabase;