import { createContext, useEffect, useState } from "react";

import {
  getAllDocuments,
  createDocument,
  deleteDocument
} from '../config/firebase-firestore';

import {
  uploadFile,
  deleteFile,
  uploadTask
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

  const [ progressPercent, setProgressPercent ] = useState(0);

  const getAllImages = async () => {
    const images = await getAllDocuments('images');
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

  const uploadImage = async () => {
    let downloadUrls = [];
    let imageData = { name: fileName };
    let uploadTasks = stagedImages.map((stagedImage, i) => {
      const task = uploadTask('images/'+stagedImage.name, stagedImage.uri);
      return task
        .on("state_changed",
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

            console.log("state changed for ", i, snapshot);

            if(i+1 === stagedImages.length){
              const progress = snapshot.bytesTransferred / snapshot.totalBytes;
              setProgressPercent(progress * 100);
            }

            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.log("failed ============================== ", error);
            switch (error.code) {
              case "storage/unknown":
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            //Update Progress

            console.log("Trying to get url: ", i);

            getDownloadURL(task.snapshot.ref)
              .then((downloadUrl) => {
                imageData[stagedImage.size] = downloadUrl;

                downloadUrls.push(downloadUrl);

                if(i+1 === stagedImages.length){
                  createDocument('images', imageData);
                  setStagedImages([]);
                  getAllImages();
                  setProgressPercent(0);
                }
              })
              .catch((e) => {
                console.log("error foo: ", e);
              });

              
          }
        );
    });

    await Promise.allSettled(uploadTasks);

  }


  const deleteImage = async (image) => {
    ['xs_img','sm_img','md_img','lg_img','xl_img']
      .forEach(size => {
        deleteFile(image[size]);
      })
    await deleteDocument('images', image);
    await getAllImages();
  }

  useEffect(() => {
    getAllImages();
  }, []);

  const value = { allImages, setAllImages, stageImage, stagedImages, uploadImage, progressPercent, uploadTask, deleteImage };

  return <ImagesContext.Provider value={value}>{children}</ImagesContext.Provider>;
};