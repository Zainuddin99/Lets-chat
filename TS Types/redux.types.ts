import { Message } from "./chat.types";
import { Rooms } from "./home.types";

//For redux
export type UserState = {
    email: string;
};

export type RoomsState = {
    roomsList: Rooms;
};

export type ChatStates = {
    activeRoomId: string;
    name: string;
    participants: number;
    description: string;
    messages: Message[];
};
