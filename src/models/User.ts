import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
	username: string;
	password: string;
	fullName: string;
	isOnline: boolean;
	lastSeen: Date;
	createdAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	fullName: {
		type: String,
		required: true,
	},
	isOnline: {
		type: Boolean,
		default: false,
	},
	lastSeen: {
		type: Date,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	}
})

const User = mongoose.model<IUser>("User", UserSchema);

export default User;