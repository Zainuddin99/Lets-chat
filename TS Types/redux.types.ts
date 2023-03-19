import { Message } from "./chat.types";
import { Rooms } from "./home.types";

//For redux
export type UserState = {
    email: string;
    firstName: "";
    lastName: "";
    bio: "";
    photoURL: "";
    cloudinaryImagePublicId: string;
    id: string;
    updatedAt: string;
    createdAt: string;
};

export type RoomsState = {
    roomsList: Rooms;
    loading: boolean;
};

export type ChatStates = {
    activeRoomId: string;
    name: string;
    participants: number;
    description: string;
    messages: Message[];
};
