import {
    addDoc,
    DocumentData,
    getDocs,
    QueryDocumentSnapshot,
    serverTimestamp,
} from "firebase/firestore";
import { firebaseAuth } from "../auth";
import { messagesSubCollectionRef } from "./setup";
import { fetchUserData } from "./users";

export const addMessage = async (roomId: string, messageText: string) => {
    try {
        const body = {
            messagedBy: firebaseAuth.currentUser?.uid,
            messagedOn: serverTimestamp(),
            text: messageText,
        };
        await addDoc(messagesSubCollectionRef(roomId), body);
    } catch (error) {
        Promise.reject(error);
    }
};

export const getRoomMessages = async (roomId: string) => {
    try {
        const response = await getDocs(messagesSubCollectionRef(roomId));
        let finalResponse: any = response.docs.map(async (item) => {
            return formatMessageWithUserData(item);
        });
        finalResponse = await Promise.all(finalResponse);
        return response;
    } catch (error) {
        Promise.reject(error);
    }
};

export const formatMessageWithUserData = async (
    item: QueryDocumentSnapshot<DocumentData>
) => {
    try {
        const currentUserId = firebaseAuth.currentUser?.uid;
        const { messagedBy, messagedOn } = item.data();
        let userData = null;
        if (messagedBy !== currentUserId) {
            const userResponse: any = await fetchUserData(messagedBy);
            const { id, firstName, lastName, photoURL } = userResponse;
            userData = { id, firstName, lastName, photoURL };
        }
        const moreData = {
            messagedBy: userData,
            loggedUser: messagedBy === currentUserId,
            messagedOn: messagedOn?.toDate().toLocaleString() || "Just now",
        };
        return { id: item.id, ...item.data(), ...moreData };
    } catch (error) {
        Promise.reject(error);
    }
};
