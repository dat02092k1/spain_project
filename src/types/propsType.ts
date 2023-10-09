import { IBook } from "./interface";

export interface IBookProp {
    books: IBook[];
}

export interface IPropupType {
    isVisible: boolean;
    onClose: () => void;
    isEdit: boolean;
    initialData: IBook | null;
}