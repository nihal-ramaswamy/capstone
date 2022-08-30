import generateKey from "../utils/generateKeys.utils";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "./firebase";

const reader = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.readAsDataURL(file);
  });
};

export const writeUserData = async (
  userId: string,
  name: string,
  email: string,
  image: string,
  audio: string
) => {
  const db = getDatabase(app);
  const response = await fetch(audio);
  const audioBlob = await response.blob();
  const unixTime = Date.now();
  const logID = generateKey();
  await reader(audioBlob).then((result) => {
    set(ref(db, "users/" + userId), {
      username: name,
      email: email,
      snapshot: image,
      voice: result,
      timestamp: unixTime,
      id: logID,
    });
  });
  return logID;
};
