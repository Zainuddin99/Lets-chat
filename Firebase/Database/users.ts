import { updateProfile } from "firebase/auth";
import { getDoc, updateDoc } from "firebase/firestore";
import { UserState } from "../../TS Types/redux.types";
import removeCloudinaryImage from "../../utils/removeCloudinaryImage";
import { firebaseAuth } from "../auth";
import { getDocData, userDocRef } from "./setup";

export const fetchUserData = (userId: string): Promise<UserState | null> => {
    return new Promise(async (res, rej) => {
        try {
            const response = await getDoc(userDocRef(userId));
            if (response.exists()) {
                return res(getDocData(response));
            }
            res(null);
        } catch (error) {
            rej(error);
        }
    });
};

export const updateProfileData = (data: UserState): Promise<void> => {
    return new Promise(async (res, rej) => {
        try {
            const { firstName, lastName, bio } = data;
            const userId = firebaseAuth.currentUser?.uid;
            if (userId) {
                await updateDoc(userDocRef(userId), {
                    firstName,
                    lastName,
                    bio,
                });
            }
            res();
        } catch (error) {
            rej(error);
        }
    });
};

export const updateProfileImage = (
    image: string,
    imageId: string
): Promise<void> =>
    new Promise(async (res, rej) => {
        try {
            const user = firebaseAuth.currentUser;
            if (user?.uid) {
                await updateProfile(user, { photoURL: image });
                await updateDoc(userDocRef(user.uid), {
                    photoURL: image,
                    cloudinaryImagePublicId: imageId,
                });
            }
            res();
        } catch (error) {
            rej(error);
        }
    });

export const removeProfileImage = (): Promise<void> =>
    new Promise(async (res, rej) => {
        try {
            const user = firebaseAuth.currentUser;
            if (user) {
                const data = await fetchUserData(user.uid);
                if (data?.cloudinaryImagePublicId) {
                    await removeCloudinaryImage(data.cloudinaryImagePublicId);
                }
                await updateProfile(user, {
                    photoURL: null,
                });
                await updateDoc(userDocRef(user.uid), {
                    photoURL: null,
                    cloudinaryImagePublicId: null,
                });
            }
            res();
        } catch (error) {
            rej(error);
        }
    });
