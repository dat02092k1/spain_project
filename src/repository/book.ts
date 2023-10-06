import { getFirestore, collection, getDocs, addDoc, setDoc, doc } from 'firebase/firestore';
import { firestore } from "../firebase/firebase"
import { DocumentData } from 'firebase/firestore/lite';
import { IBook } from '../types/interface';

export const getBook = async () => {
    const bookCollection = collection(firestore, "book");

    const res = await getDocs(bookCollection);

    const data: Array<any> = [];
    for (const doc of res.docs) {
        data.push(doc.data());
      }
      console.log(typeof data);
     return data;
}