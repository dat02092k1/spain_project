import { action, Action, persist, createStore } from 'easy-peasy';
import { IStore } from '../types/interface';
 
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
        console.log(payload);
        state.books = [...payload];        
      })
  });