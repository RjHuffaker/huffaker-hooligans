import { createContext, useEffect, useState } from "react";

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from "firebase/storage";

import {
  storage,
  getFileUrl,
  uploadFile,
  deleteFile,
  getAllFileUrls
} from '../config/firebase-storage';

import { resizeImageFile } from '../config/image-resizer';

export const ImagesContext = createContext({
  imageUrls: [],
  setImageUrls: () => null
});

export const ImagesProvider = ({ children }) => {

  const [ imageUrls, setImageUrls ] = useState([]);

  let isMounted = true;

  const uploadImage = async (imageFile, maxHeight, maxWidth, setProgress, setDownloadUrl) => {
    if (imageFile == null) return;
    await resizeImageFile(imageFile, maxWidth, maxHeight)
      .then((uri) =>{
        let[filename, extension] = imageFile.name.toUpperCase().split('.JPG');
        console.log(extension);
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






  const deleteImage = (filePath) => {
    deleteFile(filePath);
  }

  const getAllImageUrls = async () => {
    getAllFileUrls('images', setImageUrls, true)
  }

  useEffect(() => {
    getAllFileUrls('images', setImageUrls, isMounted);
    isMounted = false;
  }, []);

  const value = { imageUrls, setImageUrls, uploadImage, deleteImage, getAllImageUrls };

  return <ImagesContext.Provider value={value}>{children}</ImagesContext.Provider>;
};