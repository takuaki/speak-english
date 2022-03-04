import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

const app = createApp(App)
app.use(router)
app.mount("#app")



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQlXajidPk3iKs-HaGFY8WBowIF4QNhXk",
  authDomain: "speakinglish-c877a.firebaseapp.com",
  projectId: "speakinglish-c877a",
  storageBucket: "speakinglish-c877a.appspot.com",
  messagingSenderId: "939760050169",
  appId: "1:939760050169:web:e5a27f2023bceb8074e728",
  measurementId: "G-V7D6FCM5JV"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
//const analytics = getAnalytics(firebaseApp)