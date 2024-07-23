importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyC9j9eQXdc4IzmNm5Sh3elX39SXoqfsW-8",
  authDomain: "anadmart-4e7e0.firebaseapp.com",
  projectId: "anadmart-4e7e0",
  storageBucket: "anadmart-4e7e0.appspot.com",
  messagingSenderId: "765626466463",
  appId: "1:765626466463:web:eb8bbd6fc5c4bc000f62aa",
  measurementId: "G-N62BHPHEM7",
};
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  var fb = firebase.messaging.isSupported();

  console.log("fb", fb);

  self.registration.showNotification(notificationTitle, notificationOptions);
});
