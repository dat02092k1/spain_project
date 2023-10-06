// storageMiddleware.js
import localforage from 'localforage';

const storageMiddleware = (store: any) => (next: any) => (action: any) => {
    console.log('action', action)
  // Load state from local storage on application startup
  if (action.type === "@action.setUserInfo") {
    localforage.getItem('yourStateKey').then((state) => {
      if (state) {
        store.dispatch({ type: 'REHYDRATE_STATE', state });
      }
    });
  }

  // Save state to local storage whenever it changes
  const result = next(action);
  const newState = store.getState();
  console.log('newState', newState.currentUser)
  localforage.setItem('user', newState.currentUser);

  return result;
};

export default storageMiddleware;
