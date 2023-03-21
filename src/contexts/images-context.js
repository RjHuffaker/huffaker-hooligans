import { createContext, useEffect, useState } from "react";

import {
  getAllDocuments,
  createDocument,
  deleteDocument
} from '../config/firebase-firestore';

import {
  uploadFile,
  deleteFile,
  uploadTask,
  uploadFiles
} from '../config/firebase-storage';

import {
  getDownloadURL      
} from 'firebase/storage';

import { resizeImageFile } from '../config/image-resizer';

export const ImagesContext = createContext({
  imageUrls: [],
  setImageUrls: () => null
});

const imageSizes = [
  { size: 'xs_img', maxWidth: 200, maxHeight: 200 },
  { size: 'sm_img', maxWidth: 400, maxHeight: 400 },
  { size: 'md_img', maxWidth: 600, maxHeight: 600 },
  { size: 'lg_img', maxWidth: 800, maxHeight: 800 },
  { size: 'xl_img', maxWidth: 1000, maxHeight: 1000 }
];


export const ImagesProvider = ({ children }) => {

  const [ allImages, setAllImages ] = useState([]);

  const [ stagedImages, setStagedImages ] = useState([]);

  const [ fileName, setFileName ] = useState("");

  const [ progress, setProgress ] = useState(0);

  const [ percent, setPercent ] = useState(0);

  const [ imageFile, setImageFile ] = useState(null);

  const getAllImages = async () => {
    const images = await getAllDocuments('imageData');
    setAllImages(images);
  }

  const stageImage = async (imageFile, setPercent) => {
    setFileName(imageFile.name);
    let percent = 0;
    await Promise.allSettled(
      imageSizes.map(item => {
        resizeImageFile(imageFile, item.maxWidth, item.maxHeight)
          .then((uri) => {
            let [ filename, extension ] = imageFile.name.toUpperCase().split('.JPG');
            let newFileName = filename+'_'+item.maxWidth+'x'+item.maxHeight+extension+'.JPG';

            const image = {
              ...item,
              uri: uri,
              name: newFileName
            };
            
            setStagedImages((prev)=>[...prev, image]);
            percent+=20;
            setPercent(percent);
          });
      })
    );
  }

  const uploadImage = async (imageFiles) => {
    const downloadUrls = await uploadFiles('images/', imageFiles, setProgress);
    return downloadUrls;
  }

  const createImageData = async (downloadUrls) => {
    const imageData = {
      xs_img: downloadUrls[0],
      sm_img: downloadUrls[1],
      md_img: downloadUrls[2],
      lg_img: downloadUrls[3],
      xl_img: downloadUrls[4]
    };
    return createDocument('imageData', imageData);
  }


  const deleteImage = async (image) => {
    ['xs_img','sm_img','md_img','lg_img','xl_img']
      .forEach(size => {
        deleteFile(image[size]);
      })
    await deleteDocument('imageData', image);
    await getAllImages();
  }

  useEffect(() => {
    getAllImages();
  }, []);

  const value = {
    allImages,
    setAllImages,
    getAllImages,
    stageImage,
    stagedImages,
    uploadImage,
    createImageData,
    progress,
    setProgress,
    deleteImage,
    percent,
    setPercent,
    imageFile,
    setImageFile
  };

  return <ImagesContext.Provider value={value}>{children}</ImagesContext.Provider>;
};