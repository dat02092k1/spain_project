import { getFirestore, collection, getDocs, addDoc, setDoc, doc } from 'firebase/firestore';
import { firestore } from "../firebase/firebase"
import { ISpain } from '../types/interface';
import { DocumentData } from 'firebase/firestore/lite';

export const getSpain = async () => {
    const spainCollection = collection(firestore, "spain");

    const res = await getDocs(spainCollection);

    const data: Array<DocumentData> = [];
    for (const doc of res.docs) {
        data.push(doc.data());
      }

    console.log(data);
}

export const addSpain = async () => {
    const data = {
        pain: "Spain",
        silence: "Madrid",
      };

    const res = await addDoc(collection(firestore, "spain"), {
        ...data
    }); 

    console.log(res);

}

export const updateSpain = async () => {
    const data = {
        pain: "anh phai lam sao",
        silence: "Madrid",
    }

    const res = await setDoc(doc(firestore, "spain", "HRgt8LXX9x6qiBEP1d1a"), {
        ...data
    })

    console.log(res);
}