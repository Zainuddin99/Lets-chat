import {
    User,
    createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { serverTimestamp, setDoc } from "firebase/firestore";
import { userDocRef } from "./Database/setup";
import { firebaseApp } from "./setup";

export const firebaseAuth = getAuth(firebaseApp);

export const createUser = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
) => {
    //Add to auth
    const createdUser = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
    );
    //Add to separate collection main details to fetch user data
    //Add same id from auth to it using set doc else it will create new doc with own id in addDoc
    await setDoc(userDocRef(createdUser.user.uid), {
        email,
        firstName,
        lastName,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
    await sendEmailVerification(firebaseAuth.currentUser as User, {
        url: process.env.FIREBASE_AUTH_REDIRECT_URL as string,
    });
    return createdUser;
};

export const signInUser = async (email: string, password: string) => {
    const user = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
    );
    if (!user.user.emailVerified) {
        throw new Error("This account needs to verify email first!");
    }
    return user;
};

export const sendPasswordRestLink = async (email: string) => {
    await sendPasswordResetEmail(firebaseAuth, email, {
        url: process.env.FIREBASE_AUTH_REDIRECT_URL as string,
    });
};

export const signoutUser = () => {
    signOut(firebaseAuth);
};
