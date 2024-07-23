import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyC9j9eQXdc4IzmNm5Sh3elX39SXoqfsW-8",
  authDomain: "anadmart-4e7e0.firebaseapp.com",
  projectId: "anadmart-4e7e0",
  storageBucket: "anadmart-4e7e0.appspot.com",
  messagingSenderId: "765626466463",
  appId: "1:765626466463:web:eb8bbd6fc5c4bc000f62aa",
  measurementId: "G-N62BHPHEM7",
};

let messaging = null;

const firebaseApp = initializeApp(firebaseConfig);

if (typeof window !== "undefined") {
  messaging = getMessaging(firebaseApp);
}

export const requestForToken = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey: process.env.PUBLIC_VAPID,
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(currentToken);
      } else {
        setTokenFound(false);
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token.", err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
