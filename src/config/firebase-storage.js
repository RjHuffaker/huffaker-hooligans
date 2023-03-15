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

import app from "./firebase";

export const storage = getStorage(app);
export const storageRef = ref(storage, 'images');

export const getFile = async (filePath) => {
  const fileRef = ref(storage, filePath);
  getDownloadURL(fileRef)
    .then((url) => {
      return url;
    })
}

export const uploadFile = async (filePath) => {
  const fileRef = ref(storage, filePath);
  uploadBytesResumable(storageRef, fileRef).then((snapshot) => {
    
  });
}

export const deleteFile = async () => {

}

export const getAllFiles = async () => {
  listAll(storageRef).then((response) => {
    response.items.forEach((item) => {
      getDownloadURL(item).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  });
}
