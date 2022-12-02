import generateKey from "../utils/generateKeys.utils";
import { ref, set } from "firebase/database";
import { db, auth } from "./firebase";
import { chunkString } from "../utils/string.utils";
import {
  setPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";

const reader = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.readAsDataURL(file);
  });
};

const numChunks = (sizeInBytes: number) => {
  console.log(sizeInBytes)
  const MiB = 1048576; // Size of one mib in bytes 
  if (sizeInBytes < MiB) {
    return 1;
  }
  return (sizeInBytes / MiB + 1) as number;

}

export const writeUserData = async (
  userId: string,
  name: string,
  email: string,
  image: string,
  audio: string
) => {


  const response = await fetch(audio);
  const audioBlob = await response.blob();
  const unixTime = Date.now();
  const logID = generateKey();
  await reader(audioBlob).then((result: any) => {

    const audioSizeInBytes = Buffer.byteLength(result, "utf8");
    const audioChunks = chunkString(result, numChunks(audioSizeInBytes))

    const imageSizeInBytes = Buffer.byteLength(image, "utf8");
    const imageChunks = chunkString(image, numChunks(imageSizeInBytes));


    set(ref(db, "users/" + userId), {
      username: name,
      email: email,
      snapshot: imageChunks,
      voice: audioChunks,
      timestamp: unixTime,
      id: logID,
    });
  });
  return logID;
};


const _signInWithEmailPassword = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return { status: "ok", data: res.user };
  } catch (e) {
    return { status: "error", error: e };
  }
};

// Sets persistence while signing in
export const signInWithEmailPassword = async (email: string, password: string) => {
  try {
    await setPersistence(auth, browserSessionPersistence);
    return await _signInWithEmailPassword(email, password);
  } catch (e) {
    return { status: "error", error: e };
  }
}

const _signUpWithEmailPassword = async (email: string, password: string) => {
  try { 
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return { status: "ok", data: res.user };
  } catch (e) {
    return { status: "error", error: e };
  }
}

// Sign up with browser persistence
export const signUpWithEmailPassword = async (email: string, password: string) => {
  try { 
    await setPersistence(auth, browserSessionPersistence);
    return await _signUpWithEmailPassword(email, password);
  } catch (e) {
    return { status: "error", error: e };
  }
};

export const signOutOfSession = async () => {
  try {
    const res = await signOut(auth);
    return { status: "ok", data: res };
  } catch (e) {
    return { status: "error", error: e };
  }
};
