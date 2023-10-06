import { auth, firestore } from "../firebase/firebase";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { IUser } from "../types/interface";

export const signup = async (user: IUser) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, user.email, user.password);
         console.log(res);
    } catch (error) {
        console.log(error);
    }
}

export const signin = async (user: IUser) => {
    try { 
        console.log(user);
        
        return await signInWithEmailAndPassword(auth, user.email, user.password);
         
    } catch (error) {
        console.log('errror', error);
    }
}