import { Message } from "./chat.types";
import { Rooms } from "./home.types";

export type UserUtils = {
    mode: "light" | "dark";
};

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
    utils: UserUtils;
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
