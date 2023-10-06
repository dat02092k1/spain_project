import { Action } from 'easy-peasy';

export interface ISpain {
    pain: string;
    silence: string;
}

export interface RouteType {
    path: string;
    component: any;
    isPublic: boolean;
}

export interface FieldType {
    username?: string;
    password?: string;
    remember?: string;
};

export interface IUser {
    email: string;
    password: string;
}

export interface IStore {
    todos: string[];
    addTodo: Action<IStore, string>; 
    currentUser: IUserState | null;
    books: IBook[];
    setUserInfo: Action<IStore, IUserState>
    addBook: Action<IStore, IBook>;
    setBook: Action<IStore, IBook[]>;
}

export interface IUserState extends IUser {
    loggedIn: boolean; 
}

export interface IBook {
    author: string;
    name: string;
    price: string;
    publish: boolean;
}