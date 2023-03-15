import { createContext, useEffect, useState } from "react";

import {
  getFile,
  uploadFile,
  deleteFile,
  getAllFiles
} from '../config/firebase-storage';

export const ImagesContext = createContext({
  imageUrls: [],
  setImageUrls: () => null
});

export const ImagesProvider = ({ children }) => {

  const [ imageUrls, setImageUrls ] = useState([]);

  const getImage = async () => {
    getFile()
  }

  const uploadImage = (imageFile) => {
    uploadFile(imageFile).then((res)=>{
      console.log(res);
    })
  };

  const deleteImage = () => {
    deleteFile()
  }

  const getAllImages = async () => {
    getAllFiles().then((res) => {
      console.log(res);
    });
  }
  
  useEffect(() => {
    getAllImages();
  }, []);

  const value = { imageUrls, setImageUrls, getImage, uploadImage, deleteImage, getAllImages };

  return <ImagesContext.Provider value={value}>{children}</ImagesContext.Provider>;
};