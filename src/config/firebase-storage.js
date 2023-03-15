import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
  list
} from "firebase/storage";

import { app } from "./firebase";

export const storage = getStorage(app);

export const getFileUrl = async (filePath) => {
  const fileRef = ref(storage, filePath);
  return getDownloadURL(fileRef);
}

export const uploadFile = async (folder, filePath, setProgress) => {
  const storageRef = ref(storage, folder);
  const fileRef = ref(storage, filePath);
  const uploadTask = uploadBytesResumable(storageRef, fileRef);

  uploadTask.on('state_changed', (snapshot) => {
    const progress =
      Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgress(progress);
  },
  (error) => {
    alert(error);
  },
  () => {
    return getDownloadURL(uploadTask.snapshot.ref);
  })
}

export const deleteFile = async (filePath) => {
  const fileRef = ref(storage, filePath);
  try {
    await deleteObject(fileRef);
  } catch(error){
    console.log('error deleting file', error.message);
  }
}

export const getAllFileUrls = async (folder, setFileUrls) => {
  const storageRef = ref(storage, folder);
  listAll(storageRef).then((response) => {
    response.items.forEach((item) => {
      getDownloadURL(item).then((url) => {
        setFileUrls((prev) => [...prev, url]);
      });
    });
  });
}
