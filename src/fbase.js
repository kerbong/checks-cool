// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

import { getAnalytics, logEvent } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  setDoc,
  getDocs,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
logEvent(analytics, "notification_received");
const dbFirestore = getFirestore(firebaseApp);

//firebase에 firestore에 데이터 업로드 하기, 데이터에서 같은게 있으면 덮어쓰기, 없으면 새로 만들기
export const dbAddData = async (collection_name, data, userId) => {
  const q = query(
    collection(dbFirestore, collection_name),
    where("id", "==", data.id)
  );
  const querySnapshot = await getDocs(q);
  let existedDoc_id;
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    existedDoc_id = doc.id;
  });

  if (existedDoc_id) {
    //기존 데이터가 존재할 경우 덮어쓰기로 저장하기
    await setDoc(doc(dbFirestore, collection_name, existedDoc_id), {
      ...data,
      writtenId: userId,
    });
  } else {
    //새로운 데이터 자료 firestore에 저장하기
    await addDoc(collection(dbFirestore, collection_name), {
      ...data,
      writtenId: userId,
    });
  }
};

//firebase에 firestore에서 데이터 삭제하기
export const dbDeleteData = async (collection_name, dataId, useId) => {
  //firestore attend에서 현재유저가 작성한 자료가져오고 id가 같은거 찾아서 삭제하기
  const q = query(
    collection(dbFirestore, collection_name),
    where("writtenId", "==", useId),
    where("id", "==", dataId)
  );
  const querySnapshot = await getDocs(q);
  // console.log(querySnapshot);
  querySnapshot.forEach((document) =>
    deleteDoc(doc(dbFirestore, collection_name, document.id))
  );
};

export const authService = getAuth(firebaseApp);
export const dbService = getFirestore(firebaseApp);
export const storageService = getStorage(firebaseApp);
export const messaging = getMessaging(firebaseApp);

//서비스워커 등록 및 토큰 받아오기
export const requestForToken = async () => {
  const swRegistration = await navigator.serviceWorker.register(
    `${process.env.PUBLIC_URL}/firebase-messaging-sw.js`
  );

  const token = await getToken(messaging, {
    vapidKey: process.env.REACT_APP_VAPID_KEY,
    serviceWorkerRegistration: swRegistration,
  });

  // console.log(token);

  return token;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      // console.log("payload", payload);
      resolve(payload);
    });
  });

export const GOOGLE_APPLICATION_CREDENTIALS = "./firebase-adminsdk.json";
