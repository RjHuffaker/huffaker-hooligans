import { createContext, useEffect, useState } from "react";

import {
  getAllDocuments,
  createDocument,
  deleteDocument
} from '../config/firebase-firestore';

import {
  deleteFile,
  uploadFiles
} from '../config/firebase-storage';

import { useImageSize } from 'react-image-size';

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

  const [ stagePercent, setStagePercent ] = useState(0);

  const [ uploadPercent, setUploadPercent ] = useState(0);

  const [ imageFile, setImageFile ] = useState(null);

  const getAllImages = async () => {
    const images = await getAllDocuments('imageData');
    console.log(images);
    setAllImages(images);
  }

  const stageImage = async (imageFile) => {
    setStagePercent(0);
    setUploadPercent(0);

    if(!imageFile){
      setImageFile(null);
      setStagedImages([]);
      return;
    }

    setImageFile(URL.createObjectURL(imageFile));

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
          })
          .then(()=>{
            percent += 20;
            setStagePercent(percent);
          });
      })
    );
    
  }

  const uploadImage = async (imageFiles) => {
    const downloadUrls = await uploadFiles('images/', imageFiles, setUploadPercent);
    return downloadUrls;
  }

  const createImageData = async (downloadUrls) => {
    let imageData = {};
    
    downloadUrls.forEach((data)=>{
      const url = data.value;
      if(url.includes('1000x1000')){
        imageData.xl_img = url;
      } else if(url.includes('800x800')){
        imageData.lg_img = url;
      } else if(url.includes('600x600')){
        imageData.md_img = url;
      } else if(url.includes('400x400')){
        imageData.sm_img = url;
      } else if(url.includes('200x200')){
        imageData.xs_img = url;
      }
    });

    return createDocument('imageData', imageData);
  }


  const deleteImage = async (image) => {
    imageSizes
      .forEach(size => {
        deleteFile(image[size.size]);
      });
    await deleteDocument('imageData', image);
    await getAllImages();
  }

  useEffect(() => {
    getAllImages();
  }, []);

  const value = {
    allImages,
    getAllImages,
    stageImage,
    stagedImages,
    stagePercent,
    setStagePercent,
    uploadImage,
    uploadPercent,
    setUploadPercent,
    createImageData,
    deleteImage,
    imageFile,
    setImageFile
  };

  return <ImagesContext.Provider value={value}>{children}</ImagesContext.Provider>;
};