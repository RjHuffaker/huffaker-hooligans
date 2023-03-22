import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll
} from "firebase/storage";

import { app } from "./firebase";

export const storage = getStorage(app);

export const getFileUrl = async (folder, filePath) => {
  const storageRef = ref(storage, folder);
  const fileRef = ref(storageRef, filePath);
  console.log(fileRef);
  return getDownloadURL(fileRef);
}

export const uploadFiles = async (folder, files, setPercent) => {
  
  let percent = 0;

  setPercent(percent)

  const promises = files.map((file, i) => {
    const fileRef = ref(storage, folder+file.name);
    const task = uploadBytesResumable(fileRef, file.uri);
    
    return task
      .then((snapshot)=>{
        percent += 20;
        setPercent(percent);
        return snapshot;
      })
      .then((snapshot) => {
        // Get the download URL for the uploaded image
        return getDownloadURL(snapshot.ref).then((downloadUrl) => {
          return downloadUrl;
        });
      });
  });

  const downloadUrls = await Promise.allSettled(promises);

  console.log(downloadUrls);
  
  return downloadUrls;
}

export const deleteFile = async (filePath) => {
  const fileRef = ref(storage, filePath);
  try {
    await deleteObject(fileRef);
  } catch(error){
    console.log('error deleting file', error.message);
  }
}

export const getAllFileUrls = async (folder, setFileUrls, isMounted) => {
  const storageRef = ref(storage, folder);
  listAll(storageRef).then((response) => {
    response.items.forEach((item) => {
      getDownloadURL(item).then((url) => {
        if(isMounted) setFileUrls((prev) => [...prev, url]);
      });
    });
  });
}
