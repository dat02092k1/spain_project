import { auth, firestore } from "../firebase/firebase";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { IUser } from "../types/interface";

export const signup = async (user: IUser) => {
    try {
        await createUserWithEmailAndPassword(auth, user.email, user.password);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const signin = async (user: IUser) => {
    try {         
        return await signInWithEmailAndPassword(auth, user.email, user.password);
         
    } catch (error) {
        console.log('errror', error);
        throw error;
    }
}