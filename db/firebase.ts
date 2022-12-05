
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const apiKey = process.env.API_KEY;
const authDomain = process.env.AUTH_DOMAIN;
const databaseURL = process.env.DATABASE_URL;
const projectId = process.env.PROJECT_ID;
const storageBucket = process.env.STORAGE_BUCKET;
const messagingSenderId = process.env.MESSAGING_SENDER_ID;
const appId = process.env.APP_ID;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  databaseURL: databaseURL,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId
}
firebase.initializeApp(firebaseConfig)


export const app = initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export const db = getDatabase(app);
export const auth = getAuth(app);