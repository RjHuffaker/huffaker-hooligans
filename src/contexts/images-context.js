import { createContext, useEffect, useState } from "react";

import {
  getFileUrl,
  uploadFile,
  deleteFile,
  getAllFileUrls
} from '../config/firebase-storage';

export const ImagesContext = createContext({
  imageUrls: [],
  setImageUrls: () => null
});

export const ImagesProvider = ({ children }) => {

  const [ imageUrls, setImageUrls ] = useState([]);

  let isMounted = true;

  const getImageUrl = async (filePath) => {
    let imageUrl = await getFileUrl('images', filePath);
    return imageUrl;
  }

  const uploadImage = (imageFile) => {
    uploadFile(imageFile).then((res)=>{
      console.log(res);
    })
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

  const value = { imageUrls, setImageUrls, getImageUrl, uploadImage, deleteImage, getAllImageUrls };

  return <ImagesContext.Provider value={value}>{children}</ImagesContext.Provider>;
};