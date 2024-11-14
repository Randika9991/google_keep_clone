import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDg80XRWZPpEyo21A3ce0aNHNt5mGwdXOw",
    authDomain: "keepclone-fa10c.firebaseapp.com",
    projectId: "keepclone-fa10c",
    storageBucket: "keepclone-fa10c.appspot.com",
    messagingSenderId: "672902537356",
    appId: "1:672902537356:android:126befe290e999c9955ba9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
