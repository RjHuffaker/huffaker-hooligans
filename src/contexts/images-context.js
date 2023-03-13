import { createContext, useEffect, useState } from "react";

import {
  ref,
  uploadBytesResumable,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
  list
} from "firebase/storage";
import { storage } from "../config/firebase";

export const ImagesContext = createContext({
  imageUrls: [],
  setImageUrls: () => null
});

export const ImagesProvider = ({ children }) => {
  const [ imageUpload, setImageUpload ] = useState(null);

  const [ imageUrls, setImageUrls ] = useState([]);

  const imagesListRef = ref(storage, "images/");

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, [imagesListRef]);

  const value = { imageUrls, setImageUrls, uploadImage };

  return <ImagesContext.Provider value={value}>{children}</ImagesContext.Provider>;
};