import { createContext, useEffect, useState } from "react";

import {
  getAllDocuments,
  getFeaturedDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
} from "../config/firebase-firestore";

import { deleteFile, uploadFiles } from "../config/firebase-storage";

import { resizeImageFile } from "../config/image-resizer";

export const ImagesContext = createContext({
  imageUrls: [],
  setImageUrls: () => null,
});

const imageSizes = [
  { size: "xs_img", maxWidth: 200, maxHeight: 200 },
  { size: "sm_img", maxWidth: 400, maxHeight: 400 },
  { size: "md_img", maxWidth: 600, maxHeight: 600 },
  { size: "lg_img", maxWidth: 800, maxHeight: 800 },
  { size: "xl_img", maxWidth: 1000, maxHeight: 1000 },
];

export const ImagesProvider = ({ children }) => {
  const [allImages, setAllImages] = useState([]);

  const [featuredImages, setFeaturedImages] = useState([]);

  const [stagedImages, setStagedImages] = useState([]);

  const [stagePercent, setStagePercent] = useState(0);

  const [uploadPercent, setUploadPercent] = useState(0);

  const [imageFile, setImageFile] = useState(null);

  const getAllImages = async () => {
    const images = await getAllDocuments("imageData");
    setAllImages(images);
  };

  const getFeaturedImages = async () => {
    const featuredDocs = await getFeaturedDocuments("imageData");
    setFeaturedImages(featuredDocs);
  };

  const stageImage = async (imageFile) => {
    console.log("stageImage");

    console.log(imageFile);

    setStagePercent(0);
    setUploadPercent(0);

    if (!imageFile) {
      setImageFile(null);
      setStagedImages([]);
      return;
    }

    setImageFile(URL.createObjectURL(imageFile));

    let percent = 0;

    await Promise.allSettled(
      imageSizes.map((item) => {
        resizeImageFile(imageFile, item.maxWidth, item.maxHeight)
          .then((uri) => {
            let [filename] = imageFile.name.toUpperCase().split(".JPG");
            let newFileName =
              filename + "_" + item.maxWidth + "x" + item.maxHeight + ".JPG";

            const image = {
              ...item,
              uri: uri,
              name: newFileName,
            };

            setStagedImages((prev) => [...prev, image]);
          })
          .then(() => {
            percent += 20;
            setStagePercent(percent);
          });
        return true;
      })
    );
  };

  const uploadImage = async (imageFiles) => {
    console.log("uploadImage");

    const downloadUrls = await uploadFiles(
      "images/",
      imageFiles,
      setUploadPercent
    );
    return downloadUrls;
  };

  const createImageData = async (downloadUrls) => {
    console.log("createImageData");

    let imageData = {};

    downloadUrls.forEach((data) => {
      const url = data.value;
      if (url.includes("1000x1000")) {
        imageData.xl_img = url;
      } else if (url.includes("800x800")) {
        imageData.lg_img = url;
      } else if (url.includes("600x600")) {
        imageData.md_img = url;
      } else if (url.includes("400x400")) {
        imageData.sm_img = url;
      } else if (url.includes("200x200")) {
        imageData.xs_img = url;
      }
    });

    return createDocument("imageData", imageData);
  };

  const updateImageData = async (imageData) => {
    const imageToUpdate = await updateDocument("imageData", imageData);

    const index = allImages.findIndex((obj) => obj.id === imageToUpdate.id);

    if (index !== -1) {
      console.log("triggered");
      setAllImages((oldImages) => [imageData, ...oldImages]);
    } else {
      console.error("Image data not found in memory");
    }
  };

  const deleteImage = async (image) => {
    imageSizes.forEach((size) => {
      deleteFile(image[size.size]);
    });
    await deleteDocument("imageData", image).then(
      setAllImages((allImages) => allImages.filter((i) => i.id !== image.id))
    );

    await getAllImages();
  };

  useEffect(() => {
    getAllImages();
    getFeaturedImages();
  }, []);

  const value = {
    allImages,
    getAllImages,
    featuredImages,
    stagedImages,
    stageImage,
    stagePercent,
    setStagePercent,
    uploadImage,
    uploadPercent,
    setUploadPercent,
    createImageData,
    updateImageData,
    deleteImage,
    imageFile,
    setImageFile,
  };

  return (
    <ImagesContext.Provider value={value}>{children}</ImagesContext.Provider>
  );
};
