import { action, Action, persist, createStore } from 'easy-peasy';
import { IStore } from '../types/interface';
 
export const store = createStore<IStore>({
    todos: ['Create store', 'Wrap application', 'Use store'],
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
      })
  },  );