import {
    addDoc,
    arrayRemove,
    arrayUnion,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where,
} from "firebase/firestore";
import {
    MaxInputsLength,
    NewRoomInputs,
    Rooms,
} from "../../TS Types/home.types";
import { firebaseAuth } from "../auth";
import { roomDocRef, roomsFBCollection } from "./setup";

export const inputsLengthCriteria: MaxInputsLength = {
    name: 25,
    description: 75,
};

export const addRoom = (data: NewRoomInputs) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { name } = data;
            for (const key in <any>inputsLengthCriteria) {
                if (
                    //@ts-ignore
                    data[key as keyof typeof data].length >
                    inputsLengthCriteria[
                        key as keyof typeof inputsLengthCriteria
                    ]
                ) {
                    reject(
                        `${key} cannot exceed ${
                            inputsLengthCriteria[
                                key as keyof typeof inputsLengthCriteria
                            ]
                        } characters`
                    );
                }
            }
            const dataExists = await getDocs(
                query(roomsFBCollection, where("name", "==", name), limit(1))
            );
            if (dataExists.size) {
                return reject("Room with this name already exists!");
            }
            const { currentUser } = firebaseAuth;
            if (!currentUser) {
                return reject("User data not found!");
            }
            const createdRoom = await addDoc(roomsFBCollection, {
                ...data,
                createdBy: currentUser.uid,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                participants: [currentUser.uid],
                requests: [],
            });
            resolve(createdRoom);
        } catch (error) {
            reject(error);
        }
    });
};

export const getAllRooms = (): Promise<Rooms> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await getDocs(
                query(roomsFBCollection, orderBy("createdAt"), limit(10))
            );
            resolve(
                response.docs.map((item) => {
                    const {
                        participants,
                        name,
                        description,
                        createdAt,
                        privateRoom,
                        requests,
                    } = item.data();
                    return {
                        id: item.id,
                        createdAt: createdAt.toDate().toLocaleDateString(),
                        participants: participants.length,
                        name,
                        description,
                        privateRoom,
                        alreadyRequested: requests.includes(
                            firebaseAuth.currentUser?.uid
                        ),
                        joined: participants.includes(
                            firebaseAuth.currentUser?.uid
                        ),
                    };
                })
            );
        } catch (error) {
            reject(error);
        }
    });
};

export const getRoomData = (roomId: string) => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const response = await getDoc(roomDocRef(roomId));
            if (response.exists()) {
                const { participants, name, description } = response.data();
                resolve({
                    name,
                    participants: participants.length,
                    roomId: response.id,
                    description,
                });
            } else {
                reject("No room found");
            }
        } catch (error) {
            reject(error);
        }
    });
};

export const requestToJoin = (roomId: string) => {
    return new Promise<string>(async (resolve, reject) => {
        try {
            const response = await getDoc(roomDocRef(roomId));
            if (response.exists()) {
                const { privateRoom, requests } = response.data();
                const userId = firebaseAuth.currentUser?.uid;
                if (!privateRoom) {
                    return reject("This room is public no need to request!");
                }
                if (requests.includes(userId)) {
                    return reject("User already requested to join!");
                }
                await updateDoc(roomDocRef(roomId), {
                    requests: arrayUnion(userId),
                });
                resolve("Successfully requested");
            } else {
                reject("No room found");
            }
        } catch (error) {
            reject(error);
        }
    });
};

export const removeRequest = (roomId: string) => {
    return new Promise<string>(async (resolve, reject) => {
        try {
            const response = await getDoc(roomDocRef(roomId));
            if (response.exists()) {
                const { privateRoom, requests } = response.data();
                const userId = firebaseAuth.currentUser?.uid;
                if (!privateRoom) {
                    return reject("This is not private room!");
                }
                if (!requests.includes(userId)) {
                    return reject("User not requested to join!");
                }
                await updateDoc(roomDocRef(roomId), {
                    requests: arrayRemove(userId),
                });
                resolve("Successfully Removed request");
            } else {
                reject("No room found");
            }
        } catch (error) {
            reject(error);
        }
    });
};

export const joinRoom = (roomId: string) => {
    return new Promise<string>(async (resolve, reject) => {
        try {
            const response = await getDoc(roomDocRef(roomId));
            if (response.exists()) {
                const { privateRoom, participants } = response.data();
                const userId = firebaseAuth.currentUser?.uid;
                if (privateRoom) {
                    return reject("This is private room!");
                }
                if (participants.includes(userId)) {
                    return reject("User already joined!");
                }
                await updateDoc(roomDocRef(roomId), {
                    participants: arrayUnion(userId),
                });
                resolve("Successfully Joined");
            } else {
                reject("No room found");
            }
        } catch (error) {
            reject(error);
        }
    });
};

export const leaveRoom = (roomId: string) => {
    return new Promise<string>(async (resolve, reject) => {
        try {
            const response = await getDoc(roomDocRef(roomId));
            if (response.exists()) {
                const { participants } = response.data();
                const userId = firebaseAuth.currentUser?.uid;
                if (!participants.includes(userId)) {
                    return reject("User not joined this room!");
                }
                await updateDoc(roomDocRef(roomId), {
                    participants: arrayRemove(userId),
                });
                resolve("Successfully left room");
            } else {
                reject("No room found");
            }
        } catch (error) {
            reject(error);
        }
    });
};
