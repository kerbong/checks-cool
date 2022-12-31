import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  projectId: process.env.REACT_APP_PROJECT_ID,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

//중복실행 체크
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const messaging = getMessaging(app);
// async function requestPermission() {
//   console.log("권한 요청 중...");

//   const permission = await Notification.requestPermission();
//   if (permission === "denied") {
//     console.log("알림 권한 허용 안됨");
//     return;
//   }

//   console.log("알림 권한이 허용됨");

//   const token = await getToken(messaging, {
//     vapidKey: process.env.REACT_APP_VAPID_KEY,
//     scope: "/checks-cool",
//   });

//   if (token) console.log("token: ", token);
//   else console.log("Can not get Token");

//   onMessage(messaging, (payload) => {
//     console.log("메시지가 도착했습니다.", payload);
//     // ...
//   });
// }

// requestPermission();
async function getFcmToken() {
  await getToken(messaging, { vapidKey: process.env.REACT_APP_VAPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // ...
    });
}
getFcmToken();
// })
// .catch((err) => {
//   console.log("An error occurred while retrieving token. ", err);
// });

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register(process.env.PUBLIC_URL + "/firebase-messaging-sw.js")
//     .then(function (registration) {
//       console.log("Registration successful, scope is:", registration);

//       getToken(messaging, { vapidKey: process.env.REACT_APP_VAPID_KEY })
//         .then((currentToken) => {
//           if (currentToken) {
//             console.log("current token for client: ", currentToken);
//           } else {
//             console.log(
//               "No registration token available. Request permission to generate one."
//             );
//           }
//         })
//         .catch((err) => {
//           console.log("An error occurred while retrieving token. ", err);
//         });
//     })
//     .catch(function (err) {
//       console.log("Service worker registration failed, error:", err);
//     });
// }
