export type TMessage = {
	sender: string,
	receiver: string,
	content: string
}

export type TRecipientStatus = {
	userId: string;
	isOnline: boolean;
  lastSeen: Date | undefined;
}

export interface CustomSocketEvents {
  sendMessage: (message: TMessage) => void;
  receiveMessage: (message: TMessage) => void;
  registerUser: (userId: string) => void;
  userStatusChanged: (status: TRecipientStatus) => void;
  subscribeToUserStatus: (targetUserId: string) => void;
  unsubscribeToUserStatus: (targetUserId: string) => void;
}