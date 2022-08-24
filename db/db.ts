import { getDatabase, ref, set } from "firebase/database";
import { app } from "./firebase";


// const blobToBase64 = async (blob: string) => {
  // let result: string | ArrayBuffer | null = null;
  // const reader = new FileReader();

  // reader.onloadend = () => {
  //   const base64data = reader.result;
  //   console.log(base64data);
  //   result = base64data;
  // }

  // (async () => {
  //   const response = await fetch(blob)
  //   const imageBlob = await response.blob()
  //   reader.readAsDataURL(imageBlob);
  //   return result;
  // })()
// }

const reader = (file: Blob) => {
  return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.readAsDataURL(file);
  });
}
const readFile = async (file: string) => {
    let data;
    const response = await fetch(file);
    const fileBlob = await response.blob();
    reader(fileBlob).then(result => {console.log(result); data = result});
    return data;
}

export const writeUserData = async (userId: string, name: string, email: string, image: string, audio: string) => {
  const db = getDatabase(app);
  // const audioBase64 = await blobToBase64(audio);
  // const audioBase64 = await readFile(audio);

  const response = await fetch(audio);
  const audioBlob = await response.blob();
  await reader(audioBlob)
    .then(result => {
      set(ref(db, 'users/' + userId), {
        username: name,
        email: email,
        snapshot : image,
        voice: result
      });
    });
};
