import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const config = {
    apiKey: "AIzaSyCl2j4k9YJdN0_MgCiAt5P8mi63b1pDZSg",
    authDomain: "spain-e0821.firebaseapp.com",
    projectId: "spain-e0821", 
};

const app = initializeApp(config);

export const auth = getAuth(app); 
export const firestore = getFirestore(app);