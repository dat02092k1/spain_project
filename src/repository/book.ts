import { getFirestore, collection, getDocs, addDoc, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { firestore } from "../firebase/firebase"
import { IBook } from '../types/interface';

export const getBook = async () => {
    const bookCollection = collection(firestore, "book");

    const res = await getDocs(bookCollection);
    const data: Array<any> = [];
    for (const doc of res.docs) {
        data.push({ ...doc.data(), id: doc.id });
      }

      return data;
}

export const createBook = async (book: Partial<IBook>) => {
  try {
    await addDoc(collection(firestore, "book"), {
      ...book
  }); 

  } catch (error) {
    console.log(error);
  }
}

export const delBook = async (id: string) => {
  try {
   const res = await deleteDoc(doc(firestore, "book", id));
   console.log(res);
  } catch (error) {
    console.log(error);
  }
}

export const updateBook = async (id: string, book: Partial<IBook>) => {
  console.log(id, book);
  const res = await setDoc(doc(firestore, "book", id), {
      ...book
  })

  console.log(res);
}