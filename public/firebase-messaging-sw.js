//v8 버전1
// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config

firebase.initializeApp({
  apiKey: "AIzaSyAK7LLwtvPzIJoX_loNqoVpat-SbPjCbVo",
  projectId: "checks-cho-ok",
  messagingSenderId: "1085563899383",
  appId: "1:1085563899383:web:2e0d2f63c7613dd31472f2",
});

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 푸시알림 클릭하면 이동할 주소 설정
self.addEventListener("notificationclick", function (event) {
  // console.log("notification click");
  const url = "/checks-cool/";
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
