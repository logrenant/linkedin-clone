// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Firestore koleksiyonunu başlatıyoruz
const postsCollection = collection(db, 'posts');

// Auth modülünü başlatıyoruz
const auth = getAuth(app)


export { db, postsCollection, auth };
