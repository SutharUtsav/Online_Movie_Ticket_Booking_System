import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBX7FzhFwfBjvGaksDlC8HhpiHEvkCem-s",
    authDomain: "movie-ticket-booking-47989.firebaseapp.com",
    projectId: "movie-ticket-booking-47989",
    storageBucket: "movie-ticket-booking-47989.appspot.com",
    messagingSenderId: "1035519483021",
    appId: "1:1035519483021:web:01ebe67fa9b712b60016c4"
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);