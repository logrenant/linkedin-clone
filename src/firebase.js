// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAQtWN4QIb5Zkz6InAdjNbIm_f7tF9IQ9Y",
    authDomain: "linkedin-clone-9dd8c.firebaseapp.com",
    projectId: "linkedin-clone-9dd8c",
    storageBucket: "linkedin-clone-9dd8c.appspot.com",
    messagingSenderId: "902712323453",
    appId: "1:902712323453:web:628d9e2d6812ffb9dcf014"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const postsCollection = collection(db, 'posts');

const auth = getAuth(app);


export { db, postsCollection, auth };
