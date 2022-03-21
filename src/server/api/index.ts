import { initializeApp } from "firebase/app";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCQlXajidPk3iKs-HaGFY8WBowIF4QNhXk",
  authDomain: "speakinglish-c877a.firebaseapp.com",
  databaseURL:
    "https://speakinglish-c877a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "speakinglish-c877a",
  storageBucket: "speakinglish-c877a.appspot.com",
  messagingSenderId: "939760050169",
  appId: "1:939760050169:web:e5a27f2023bceb8074e728",
  measurementId: "G-V7D6FCM5JV",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db: Database = getDatabase(
  firebaseApp,
  "https://speakinglish-c877a-default-rtdb.asia-southeast1.firebasedatabase.app/"
);

const auth = getAuth(firebaseApp);
const functions = getFunctions(firebaseApp);

//emulator
if (import.meta.env.DEV) {
  connectDatabaseEmulator(db, "localhost", 9000);
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFunctionsEmulator(functions, "localhost", 5001);
}

export { db, auth, functions };
