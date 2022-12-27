import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";
import { onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  projectId: process.env.REACT_APP_PROJECT_ID,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
initializeApp(firebaseConfig);

const messaging = getMessaging();

onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // ...
});
