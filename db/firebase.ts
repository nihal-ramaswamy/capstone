
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
  apiKey: "AIzaSyBq_HpVNhep9-CWodnb8SZ6sLkNsmJq4P4",
  authDomain: "capstonefin-857d3.firebaseapp.com",
  projectId: "capstonefin-857d3",
  storageBucket: "capstonefin-857d3.appspot.com",
  messagingSenderId: "604455072038",
  appId: "1:604455072038:web:edfb02aadd1bd7990311e7"
}
firebase.initializeApp(firebaseConfig)


export const app = initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export const db = getDatabase(app);
export const auth = getAuth(app);