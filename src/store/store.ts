import { action, Action, persist, createStore } from 'easy-peasy';
import { IBook, IStore } from '../types/interface';
import { UtilFuncs } from '../shared/util';
 
export const store = createStore<IStore>({
    todos: ['Create store', 'Wrap application', 'Use store'],
    books: [], 
    addTodo: action((state, payload) => {
        state.todos.push(payload);
      }),
    currentUser: persist({
        loggedIn: false,
        email: '',
        password: ''
    }, {
        storage: 'localStorage'
    }),
    setUserInfo: action((state, payload) => {
        state.currentUser = payload;        
      }), 
    addBook: action((state, payload) => {
        state.books.push(payload);        
      }),
    setBook: action((state, payload) => {
        state.books = [...payload];        
      }),
    removeBook: action((state, payload) => {
      state.books = state.books.filter((item: IBook) => item.id !== payload);
    }),
    updateBookStore: action((state, payload) => {
      state.books = state.books.map(item => (item.id === payload.id ? UtilFuncs.updateObj(item, payload.bookInfo) : item));
    })
  });