import axios from "axios";
import type { AxiosInstance } from "axios";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VUE_API_ENDPOINT as string,
  headers: {
    "Content-type": "application/json",
  },
});

const firebaseConfig = {
  apiKey: "AIzaSyCQlXajidPk3iKs-HaGFY8WBowIF4QNhXk",
  authDomain: "speakinglish-c877a.firebaseapp.com",
  projectId: "speakinglish-c877a",
  storageBucket: "speakinglish-c877a.appspot.com",
  messagingSenderId: "939760050169",
  appId: "1:939760050169:web:e5a27f2023bceb8074e728",
  measurementId: "G-V7D6FCM5JV",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(firebaseApp)

export default apiClient;
