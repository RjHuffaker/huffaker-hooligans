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

import { resizeImageFile } from '../config/image-resizer';

export const storage = getStorage(app);

export const getFileUrl = async (folder, filePath) => {
  const storageRef = ref(storage, folder);
  const fileRef = ref(storageRef, filePath);
  console.log(fileRef);
  return getDownloadURL(fileRef);
}

export const uploadFile = async (filePath, file, setProgress, setDownloadUrl) => {
  
  const fileRef = ref(storage, filePath);

  const uploadTask = uploadBytesResumable(fileRef, file);

  uploadTask.on('state_changed', (snapshot) => {
    const progress =
      Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgress(progress);
  },
  (error) => {
    alert(error);
  },
  () => {
    getDownloadURL(uploadTask.snapshot.ref)
      .then((url) => {
        setDownloadUrl(url);
      });
  })
}


export const uploadImageFile = async (imageFile, maxWidth, maxHeight, setProgress, setDownloadUrl) => {
  if (imageFile == null) return;
  await resizeImageFile(imageFile, maxWidth, maxHeight)
    .then((uri) =>{
      let[filename, extension] = imageFile.name.toUpperCase().split('.JPG');
      
      let newFileName = filename+'_'+maxWidth+'x'+maxHeight+extension+'.JPG';

      const imageRef = ref(storage, `images/${newFileName}`);
      const uploadTask = uploadBytesResumable(imageRef, uri);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100 
          );
        
          // update progress
          setProgress(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setDownloadUrl(url);
          });
        }
      );
    });
};


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