export type TMessage = {
	sender: string,
	receiver: string,
	content: string
}

export interface CustomSocketEvents {
  sendMessage: (message: TMessage) => void;
  receiveMessage: (message: TMessage) => void;
  registerUser: (userId: string) => void;
}