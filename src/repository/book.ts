import { collection, getDocs, addDoc, deleteDoc, query, where, updateDoc } from 'firebase/firestore';
import { firestore } from "../firebase/firebase"
import { IBook } from '../types/interface';

export const getBook = async () => {
    try {
      const bookCollection = collection(firestore, "book");

    const res = await getDocs(bookCollection);
    const data: Array<any> = [];
    for (const doc of res.docs) {
        data.push({ ...doc.data(), id: doc.id });
      }
      return data;
    } catch (error) {
      throw error;
    }
}

export const createBook = async (book: Partial<IBook>) => {
  try {
    await addDoc(collection(firestore, "book"), {
      ...book
  }); 

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const delBook = async (id: string) => {
  try {
    const bookCollection = collection(firestore, "book");
    const q = query(bookCollection, where("_id", "==", id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
    // await deleteDoc(doc(firestore, "book", id));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const updateBook = async (id: string, book: Partial<IBook>) => {
  try {
    const bookCollection = collection(firestore, "book");
    const q = query(bookCollection, where("_id", "==", id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await updateDoc(doc.ref, book);
    });
  } catch (error) {
    throw error;
  }
}