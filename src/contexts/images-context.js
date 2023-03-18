import { createContext, useEffect, useState } from "react";

import {
  getAllDocuments,
  createDocument,
  deleteDocument
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
  { size: 'lg_img', maxWidth: 800, maxHeight: 800 },
  { size: 'xl_img', maxWidth: 1000, maxHeight: 1000 }
];


export const ImagesProvider = ({ children }) => {

  const [ imageUrls, setImageUrls ] = useState([]);

  const [ imageBlobs, setImageBlobs ] = useState([]);

  const [ allImages, setAllImages ] = useState([]);

  const [ fileName, setFileName ] = useState("");

  let isMounted = true;

  const getAllImages = async () => {
    const images = await getAllDocuments('images');
    setAllImages(images);
  }

  const stageImage = async (imageFile, setPercent) => {
    setFileName(imageFile.name);
    let percent = 0;
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
          percent+=20;
          setPercent(percent);
        });
    }));

  }

  const uploadImage = async () => {
    let urls = [];
    let imageData = { name: fileName };
    Promise.all(
      imageBlobs.map(imageBlob => {
        uploadFile(
          'images/'+imageBlob.name,
          imageBlob.uri,
          ()=>{},
          (url)=>{
            imageData[imageBlob.size] = url;

            urls.push(url);
            if(urls.length === imageBlobs.length){
              createDocument('images', imageData);
              getAllImages();
            }
            return url;
          }
        )
      })
    );
  }

  const deleteImage = async (image) => {
  //  Promise.all(
      ['xs_img','sm_img','md_img','lg_img','xl_img']
        .forEach(size => {
          deleteFile(image[size]);
        })
  //  )
    await deleteDocument('images', image);
    await getAllImages();
  }

  const getAllImageUrls = async () => {
    getAllFileUrls('images', setImageUrls, true)
  }

  useEffect(() => {
    getAllFileUrls('images', setImageUrls, isMounted);
    getAllImages();
    isMounted = false;
  }, []);

  const value = { allImages, setAllImages, imageUrls, setImageUrls, stageImage, uploadImage, deleteImage, getAllImageUrls };

  return <ImagesContext.Provider value={value}>{children}</ImagesContext.Provider>;
};