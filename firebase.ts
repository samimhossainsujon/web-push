import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcmymWqW0BNeWMHVW1Z2lsvBvVu5tcJpY",
  authDomain: "job-circular-net.firebaseapp.com",
  databaseURL: "https://job-circular-net-default-rtdb.firebaseio.com",
  projectId: "job-circular-net",
  storageBucket: "job-circular-net.appspot.com",
  messagingSenderId: "872223083121",
  appId: "1:872223083121:web:3561221037e1466c5429d0",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
