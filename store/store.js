import { createStore, combineReducers } from 'redux';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { firestoreReducer, createFirestoreInstance } from 'redux-firestore';
import 'firebase/auth';
import { firebaseReducer } from 'react-redux-firebase';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';


import { FIREBASE_KEY, FIREBASE_ID } from '../config.json';


// initialize firebase and set up the firebase store
const firebaseConfig = {
  apiKey: FIREBASE_KEY,
  authDomain: `${FIREBASE_ID}.firebaseapp.com`,
  projectId: FIREBASE_ID,
};


// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
firebase.firestore();


// Add Firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

const persistanceConfig = {
  key: 'storage',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistanceConfig, rootReducer);

const initialState = { firestore: {} };

export const store = createStore(persistedReducer, initialState);

export default persistentStore = persistStore(store);


export const rrfProps = {
  firebase,
  config: {
    userProfile: 'users',
    useFirestoreForProfile: true,
  },
  dispatch: store.dispatch,
  createFirestoreInstance,
};
