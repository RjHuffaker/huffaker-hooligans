import { createContext, useEffect, useState } from "react";

import {
  createDocument
} from '../config/firebase-firestore';

import {
  storage,
  getFileUrl,
  uploadFile,
  deleteFile,
  getAllFileUrls,
  uploadImageFile
} from '../config/firebase-storage';

import { resizeImageFile } from '../config/image-resizer';

export const ImagesContext = createContext({
  imageUrls: [],
  setImageUrls: () => null
});

const defaultImageData = {
  name: "",
  url_xs: "",
  url_sm: "",
  url_md: "",
  url_lg: "",
  url_xl: "",
}

const defaultBlobs = {
  xsImg: null,
  smImg: null,
  mdImg: null,
  lgImg: null,
  xlImg: null
}

const imageSizes = [
  { size: 'xs_img', maxWidth: 200, maxHeight: 200 },
  { size: 'sm_img', maxWidth: 400, maxHeight: 400 },
  { size: 'md_img', maxWidth: 600, maxHeight: 600 },
//  { size: 'lg_img', maxWidth: 800, maxHeight: 800 },
//  { size: 'xl_img', maxWidth: 1000, maxHeight: 1000 }
];


export const ImagesProvider = ({ children }) => {

  const [ imageUrls, setImageUrls ] = useState([]);

  const [ imageBlobs, setImageBlobs ] = useState([]);

  const [ blobs, setBlobs ] = useState([]);

  const [ imageData, setImageData ] = useState();

  let isMounted = true;

  const stageImage = async (imageFile, setPercent) => {

    await Promise.all(imageSizes.map(item => {
      resizeImageFile(imageFile, item.maxWidth, item.maxHeight)
        .then((uri) => {
          let [ filename, extension ] = imageFile.name.toUpperCase().split('.JPG');
          let newFileName = filename+'_'+item.maxWidth+'x'+item.maxHeight+extension+'.JPG';

          const imageBlob = {
            ...item,
            uri: uri,
            name: newFileName
          };
          setImageBlobs((prev)=>[...prev, imageBlob]);
          console.log(imageBlob);
        });
    }));

  }

  const uploadImage = async () => {
    Promise.all(
      imageBlobs.map(imageBlob => {
        uploadFile(
          'images/'+imageBlob.name,
          imageBlob.uri,
          ()=>{},
          (url)=>{
            
            setImageData({...imageData, [imageBlob.size]: url});
            console.log(imageData);
          }
        )
      })
    )
    .then((url)=>{
      console.log(url);
    //  createDocument('images', imageData);
    });
  }


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

  const value = { imageUrls, setImageUrls, stageImage, uploadImage, deleteImage, getAllImageUrls };

  return <ImagesContext.Provider value={value}>{children}</ImagesContext.Provider>;
};