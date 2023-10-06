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
    setUserInfo: Action<IStore, IUserState>
}

export interface IUserState extends IUser {
    loggedIn: boolean; 
}