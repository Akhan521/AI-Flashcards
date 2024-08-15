import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyCzMhLjg9RLBmbz4nmacEZDb0qnTJ5OLEo",
    authDomain: "ai-flashcards-e6117.firebaseapp.com",
    projectId: "ai-flashcards-e6117",
    storageBucket: "ai-flashcards-e6117.appspot.com",
    messagingSenderId: "515279611126",
    appId: "1:515279611126:web:2eb4f77d3a9a04f2f9f8d7"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;