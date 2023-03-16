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

  const getImageUrl = async (filePath) => {
    getFileUrl('images', filePath);
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
    getAllFileUrls('images', setImageUrls)
  }
  
  useEffect(() => {
    getAllImageUrls();
  }, []);

  const value = { imageUrls, setImageUrls, getImageUrl, uploadImage, deleteImage, getAllImageUrls };

  return <ImagesContext.Provider value={value}>{children}</ImagesContext.Provider>;
};