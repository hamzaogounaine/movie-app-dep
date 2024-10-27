import { app, auth } from "./firebase";
import { getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updateProfile, updateEmail, updatePassword, sendEmailVerification } from "firebase/auth";
import { getDocs, collection } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const firestore = getFirestore(app);

export const signUp = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const signIn = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const logOut = async () => {
    return auth.signOut();
}

export const forgotPassword = async (email) => {
    return sendPasswordResetEmail(auth, email);
}

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
}


export const changeDisplayName = async (displayName) => {
    const user = auth.currentUser;
    if (user) {
        return updateProfile(user, { displayName });
    } else {
        throw new Error("No authenticated user");
    }
}

export const changeEmail = async (newEmail) => {
    const user = auth.currentUser;
    if (user) {
        return updateEmail(user, newEmail);
    } else {
        throw new Error("No authenticated user");
    }
}

export const changePassword = async (newPassword) => {
    const user = auth.currentUser;
    if (user) {
        return updatePassword(user, newPassword);
    } else {
        throw new Error("No authenticated user");
    }
}

export const verifyEmail = async () => {
    const user = auth.currentUser;
    if (user) {
        return sendEmailVerification(user);
    } else {
        throw new Error("No authenticated user");
    }
}