import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';

const config = {
  apiKey: 'AIzaSyCbSgwVroXleGZFljVNOLaMQKeePDXm-i4', // it's ok to store it public(https://firebase.google.com/docs/projects/api-keys)
  authDomain: 'vue-note-d1e53.firebaseapp.com',
  databaseURL: 'https://vue-note-d1e53.firebaseio.com',
  projectId: 'vue-note-d1e53',
  storageBucket: 'vue-note-d1e53.appspot.com',
  messagingSenderId: '152547013715',
};
export const firebaseApp = initializeApp(config);
export const firebaseDB = getDatabase(firebaseApp);
