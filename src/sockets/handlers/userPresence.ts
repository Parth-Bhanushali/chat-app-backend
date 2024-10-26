import { DefaultEventsMap, Socket } from "socket.io";
import { CustomSocketEvents } from "../../types/custom";
import User from "../../models/User";

const notifyUserStatusChange = (
	userId: string, 
	isOnline: boolean, 
	socket: Socket<CustomSocketEvents, CustomSocketEvents, DefaultEventsMap, any>, 
	lastSeen: Date | undefined
) => {
	socket.to(`userStatus_${userId}`).emit('userStatusChanged', { userId, isOnline, lastSeen });
}

const userPresence = (
	socket: Socket<CustomSocketEvents, CustomSocketEvents, DefaultEventsMap, any>, 
) => {
	socket.on("registerUser", async (userId: string) => {
		await User.findByIdAndUpdate(userId, { isOnline: true, lastSeen: null });
		socket.join(userId);
		notifyUserStatusChange(userId, true, socket, undefined);
		console.log('Joined: ' + userId);

		socket.on("disconnect", async () => {
			const lastSeen = new Date();
			await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen });
			notifyUserStatusChange(userId, false, socket, lastSeen);	
			socket.leave(userId);
			console.log('Left: ' + userId);
		});

		socket.on('subscribeToUserStatus', (targetUserId: string) => {
			socket.join(`userStatus_${targetUserId}`)
		})
		
		socket.on('unsubscribeToUserStatus', (targetUserId: string) => {
			socket.leave(`userStatus_${targetUserId}`)
		})
	});
}

export default userPresence;